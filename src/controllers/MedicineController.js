import { Router } from 'express'
import { param, body } from 'express-validator'
import {
  getAll,
  getSpecific,
  create,
  update,
  deleteSpecific
} from '../services/MedicineServices.js'

const router = Router()

// GET /api/medicines/
router.get('/', getAll)
// GET /api/medicines/:id
router.get(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  getSpecific
)
// POST /api/medicines/
router.post(
  '/',
  body('name').notEmpty().withMessage('El nombre es requerido'),
  create
)
// PUT /api/medicines/:_id
router.put(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  body('name').notEmpty().withMessage('El nombre es requerido'),
  update
)
// DELETE /api/medicines/:_id
router.delete(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  deleteSpecific
)

export default router
