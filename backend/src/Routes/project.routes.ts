import { Router } from "express";
import { verifyToken } from "../controllers/authController.js";
import { createProjectHandler } from "../controllers/projectController.js";


export const projectRouter = Router()

projectRouter.post('/projects',verifyToken,createProjectHandler)
