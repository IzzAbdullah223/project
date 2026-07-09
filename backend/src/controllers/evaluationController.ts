import { type Response} from 'express'
import { type AuthenticatedRequest } from '../middleware/apiKeyAuth.js'
import { evaluateFlagForUser } from '../services/evaluationService.js'

export async function evaluateHandler(req:AuthenticatedRequest,res:Response){
    const {flagKey,user} = req.body

    if(!flagKey || !user?.id){
        return res.status(400).json({error:"flagKey and user.userId are required"})
    }

    const result = await evaluateFlagForUser(flagKey,req.environmentId!,user)

    return res.json(result)
} 