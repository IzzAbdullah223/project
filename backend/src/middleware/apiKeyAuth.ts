import { type Request, type Response, type NextFunction } from 'express';
import { prisma } from '../db/prisma.js';

export interface AuthenticatedRequest extends Request {
    environmentId?: string
}

export async function apiKeyAuth(req:AuthenticatedRequest,res:Response,next:NextFunction){
    const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }

    const key = authHeader.replace('Bearer ', '');

    const apiKey = await prisma.apiKey.findUnique({
        where:{key}
    });

    if(!apiKey || apiKey.revoked){
        return res.status(401).json({error: 'Invalid or revoked Api key'})
    }

  const shouldUpdate =
    !apiKey.lastUsedAt || Date.now() - apiKey.lastUsedAt.getTime() > 5 * 60 * 1000;

  if (shouldUpdate) {
    prisma.apiKey
      .update({
        where: { id: apiKey.id },
        data: { lastUsedAt: new Date() },
      })
      .catch(() => {});
  }

req.environmentId = apiKey.environmentId;
  next();
}