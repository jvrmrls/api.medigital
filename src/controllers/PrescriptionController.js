import { Router } from 'express'
import { param, body } from 'express-validator'
import {
  getAll,
  create,
  deleteSpecific,
  createDetail,
  deleteDetail,
  getSpecific
} from '../services/PrescriptionServices.js'
import { authenticateToken } from '../helpers/jwt.js'

const router = Router()

// GET /api/prescriptions/
router.get('/', authenticateToken, getAll)

// GET /api/prescriptions/:_id
router.get('/:_id', authenticateToken, getSpecific)

// POST /api/prescriptions/
router.post(
  '/',
  authenticateToken,
  body('consult')
    .isMongoId()
    .withMessage('El ID de consulta no es del formato correcto'),
  create
)

// DELETE /api/prescriptions/:id
router.delete(
  '/:_id',
  authenticateToken,
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  deleteSpecific
)

// POST /api/prescriptions/:_id/detail
router.post(
  '/:_id/detail',
  authenticateToken,
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  body('medicine')
    .isMongoId()
    .withMessage('El ID de medicamento no es del formato correcto'),
  body('quantity').isNumeric().withMessage('La cantidad debe ser un número'),
  createDetail
)

// DELETE /api/prescriptions/:_id/detail
router.delete(
  '/:_id/detail/:_idDetail',
  authenticateToken,
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  param('_idDetail')
    .isMongoId()
    .withMessage('El ID de detalle no es del formato correcto'),
  deleteDetail
)

export default router
