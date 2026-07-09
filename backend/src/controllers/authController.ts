import { type Response, type Request, type NextFunction } from 'express';
import jwt, { type Secret, type JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '../db/prisma.js';

declare global {
  namespace Express {
    interface Request {
      token?: string;
    }
  }
}

interface TokenPayload {
  user: {
    id: string;
    email: string;
  };
}

export async function signupPost(req: Request, res: Response) {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'email, password, and name are required' });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ error: 'An account with this email already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, passwordHash, name },
  });

  return res.status(201).json({ id: user.id, email: user.email, name: user.name });
}

export async function loginPost(req: Request, res: Response) {
  const user = req.user;

  jwt.sign(
    { user },
    process.env.SECRET_KEY as Secret,
    { expiresIn: '7d' },
    (err: Error | null, token: string | undefined) => {
      res.json({ token });
    }
  );
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader === 'undefined') {
    return res.status(403).json({ error: 'No token provided' });
  }

  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];

  if (!bearerToken) {
    return res.status(403).json({ error: 'Invalid token format' });
  }

  jwt.verify(
    bearerToken,
    process.env.SECRET_KEY as Secret,
    (err: Error | null, authData: string | JwtPayload | undefined) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
      }

      const payload = authData as TokenPayload;
      req.token = bearerToken;
      req.user = payload.user;
      next();
    }
  );
}