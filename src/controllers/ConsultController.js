import { Router } from 'express'
import { param, body } from 'express-validator'
import {
  getAll,
  getSpecific,
  create,
  update,
  deleteSpecific,
  startSpecific,
  cancelSpecific
} from '../services/ConsultServices.js'
import { authenticateToken } from '../helpers/jwt.js'

const router = Router()

// GET /api/consults/ || /api/consults?status=
router.get('/', authenticateToken, getAll)
// GET /api/consults/:_id
router.get(
  '/:_id',
  authenticateToken,
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  getSpecific
)
// POST /api/consults/
router.post(
  '/',
  authenticateToken,
  body('date').isDate().withMessage('La fecha no es válida'),
  body('patient').isMongoId().withMessage('El ID de paciente no es válido'),
  body('doctor').isMongoId().withMessage('El ID de doctor no es válido'),
  create
)

// PUT /api/consults/:_id/start-specific
router.put(
  '/:_id/start-specific',
  authenticateToken,
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  startSpecific
)

// PUT /api/consults/:_id/cancel-specific
router.put(
  '/:_id/cancel-specific',
  authenticateToken,
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  cancelSpecific
)

// PUT /api/consults/:_id
router.put(
  '/:_id',
  authenticateToken,
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  body('date').isDate().withMessage('La fecha no es válida'),
  body('patient').isMongoId().withMessage('El ID de paciente no es válido'),
  body('doctor').isMongoId().withMessage('El ID de doctor no es válido'),
  update
)
// DELETE /api/consults/:_id
router.delete(
  '/:_id',
  authenticateToken,
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  deleteSpecific
)
export default router
