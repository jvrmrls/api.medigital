import { Router } from 'express'
import { param, body } from 'express-validator'
import {
  getAll,
  getSpecific,
  create,
  auth
} from '../services/CommonUserServices.js'

const router = Router()

// GET /api/common-users/
router.get('/', getAll)
// GET /api/common-users/:id
router.get(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  getSpecific
)
// POST /api/common-users/
router.post(
  '/',
  body('firstName').notEmpty().withMessage('Los nombres no son válidos'),
  body('lastName').notEmpty().withMessage('Los apellidos no son válidos'),
  body('email').isEmail().withMessage('El correo no es válido'),
  body('platform')
    .isIn(['GOOGLE', 'FACEBOOK', 'NATIVE'])
    .withMessage('La plataforma de acceso no es válida'),
  create
)
// POST /api/common-users/auth
router.post(
  '/auth',
  body('platform')
    .isIn(['GOOGLE', 'FACEBOOK', 'NATIVE'])
    .withMessage('La plataforma no es válida'),
  auth
)
export default router
