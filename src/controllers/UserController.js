import { Router } from 'express'
import { param, body } from 'express-validator'
import {
  getAll,
  getSpecific,
  create,
  update,
  deleteSpecific,
  auth
} from '../services/UserServices.js'

const router = Router()

// GET /api/users/
router.get('/', getAll)
// GET /api/users/:id
router.get(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  getSpecific
)
// POST /api/users/
router.post(
  '/',
  body('username').notEmpty().withMessage('El nombre de usuario es requerido'),
  body('password').notEmpty().withMessage('La contraseña es requerida'),
  body('type')
    .isIn(['NORMAL', 'ADMIN'])
    .withMessage('El tipo de usuario no es válido'),
  create
)
// PUT /api/users/:_id
router.put(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  body('username').notEmpty().withMessage('El nombre de usuario es requerido'),
  update
)
// DELETE /api/users/:_id
router.delete(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  deleteSpecific
)
// POST /api/users/auth
router.post(
  '/auth',
  body('username').notEmpty().withMessage('El nombre de usuario es requerido'),
  body('password').notEmpty().withMessage('La contraseña es requerida'),
  auth
)
export default router
