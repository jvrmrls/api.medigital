import { Router } from 'express'
import { param } from 'express-validator'
import {
  getAll,
  getSpecific,
  getSpecificByCode
} from '../services/DiagnosticServices.js'

const router = Router()

// GET /api/diagnostics/
router.get('/', getAll)
// GET /api/diagnostics/:id
router.get(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  getSpecific
)
// GET /api/diagnostics/code/:code
router.get(
  '/code/:code',
  param('code').isString().withMessage('El código no es válido'),
  getSpecificByCode
)
export default router
