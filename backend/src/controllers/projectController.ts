import { type Response, type Request } from 'express';
import { createProject } from '../services/projectService.js'

export async function createProjectHandler(req:Request,res:Response){
    const {name} = req.body
    const userId = req.user?.id

    if(!name){
        res.status(400).json({error:"Name is required"})
    }

    if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const project = await createProject(name,userId)

  return res.status(201).json(project)
}