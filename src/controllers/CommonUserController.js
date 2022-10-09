import { Router } from 'express'
import { param, body } from 'express-validator'
import {
  getAll,
  getSpecific,
  create,
  auth
} from '../services/CommonUserServices.js'

const router = Router()

// GET /api/common-user/
router.get('/', getAll)
// GET /api/common-user/:id
router.get('/:_id', param('_id').isMongoId(), getSpecific)
// POST /api/common-user/
router.post(
  '/',
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('email').isEmail(),
  body('platform').isIn(['GOOGLE', 'FACEBOOK', 'NATIVE']),
  create
)
// POST /api/common-user/auth
router.post(
  '/auth',
  body('platform').isIn(['GOOGLE', 'FACEBOOK', 'NATIVE']),
  auth
)
export default router
