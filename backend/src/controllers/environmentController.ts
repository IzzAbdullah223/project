import  {type Request, type Response} from 'express'
import { createEnvironment } from '../services/environmentService.js';
 

export async function createEnviornmentHandler(req:Request,res:Response){
    const {projectId,name,key} = req.body
    const userId = req.user?.id


    if(!projectId || !name ||!key){
        res.status(400).json({error:"projectId, name, and key are required"});
    }

    if(!userId){
        return res.status(401).json({error:"Unauthorized"});
    }

    try{
         const environment = await createEnvironment(projectId,name,key,userId)
         res.status(201).json(environment)
    }catch(err){
        if(err instanceof Error && err.message === "FORBIDDEN"){
            res.status(403).json({error:"You are not a member of this project"})
        }
        throw err
    }
}