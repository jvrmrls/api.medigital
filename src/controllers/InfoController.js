import { Router } from 'express'
import { authenticateToken } from '../helpers/jwt.js'
import { getInfo } from '../services/InfoServices.js'
const router = Router()
// GET /api/info
router.get('/', authenticateToken, getInfo)

export default router
