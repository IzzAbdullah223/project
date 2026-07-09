import { Router } from 'express';
import { apiKeyAuth } from '../middleware/apiKeyAuth.js';
import { evaluateHandler } from '../controllers/evaluationController.js';

export const evaluationRouter = Router();

evaluationRouter.post('/evaluate', apiKeyAuth, evaluateHandler);

 