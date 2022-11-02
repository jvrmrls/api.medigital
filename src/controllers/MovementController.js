import { Router } from 'express'
import { param, body } from 'express-validator'
import {
  getAll,
  getSpecific,
  create,
  update,
  deleteSpecific
} from '../services/MovementServices.js'

const router = Router()

// GET /api/movements/
router.get('/', getAll)
// GET /api/movements/:id
router.get(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  getSpecific
)
// POST /api/movements/
router.post(
  '/',
  body('medicine')
    .isMongoId()
    .withMessage('El ID de medicamento no es del formato correcto'),
  body('quantity')
    .isNumeric()
    .withMessage('La cantidad es requerida y debe ser un número'),
  body('type')
    .isIn(['IN', 'OUT'])
    .withMessage('El tipo de movimiento no es válido'),
  create
)
// PUT /api/movements/:_id
router.put(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  body('medicine')
    .isMongoId()
    .withMessage('El ID de medicamento no es del formato correcto'),
  body('quantity')
    .isNumeric()
    .withMessage('La cantidad es requerida y debe ser un número'),
  body('type')
    .isIn(['IN', 'OUT'])
    .withMessage('El tipo de movimiento no es válido'),
  update
)
// DELETE /api/movements/:_id
router.delete(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  deleteSpecific
)

export default router
