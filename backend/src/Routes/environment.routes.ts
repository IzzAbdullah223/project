import { Router } from "express";
import { verifyToken } from "../controllers/authController.js";
import { createEnviornmentHandler } from "../controllers/environmentController.js";

export const environmentRouter = Router()

environmentRouter.post('/enviornments',verifyToken,createEnviornmentHandler)