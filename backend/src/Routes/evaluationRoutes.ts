import { Router } from 'express';
import { apiKeyAuth } from '../middleware/apiKeyAuth.js';
import { evaluateHandler } from '../controllers/evaluationController.js';

const router = Router();

router.post('/evaluate', apiKeyAuth, evaluateHandler);

export default router;