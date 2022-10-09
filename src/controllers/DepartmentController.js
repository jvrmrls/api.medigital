import { Router } from 'express'
import { param } from 'express-validator'
import {
  getAll,
  getSpecific,
  getSpecificByCode
} from '../services/DepartmentsServices.js'

const router = Router()

// GET /api/departments/
router.get('/', getAll)
// GET /api/departments/:id
router.get(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  getSpecific
)
// GET /api/departments/code/:code
router.get(
  '/code/:code',
  param('code').isNumeric().withMessage('El código no es válido'),
  getSpecificByCode
)
export default router
