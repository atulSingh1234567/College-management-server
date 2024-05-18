import {Router} from 'express'
import { generateNewRefreshToken } from '../controllers/token.controllers.js';

const router = Router();
router.route('/generate-refresh-token').get(generateNewRefreshToken)

export default router