import { Router } from 'express'
import { param, body } from 'express-validator'
import {
  getAll,
  getSpecific,
  create,
  update,
  deleteSpecific,
  getAvailable
} from '../services/AppointmentServices.js'
import { authenticateToken } from '../helpers/jwt.js'

const router = Router()

// GET /api/appointment/ || /api/appointment?booked_by=
router.get('/', authenticateToken, getAll)
// GET /api/appointment/available?date=
router.get('/available', authenticateToken, getAvailable)
// GET /api/appointment/:_id
router.get(
  '/:_id',
  authenticateToken,
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  getSpecific
)
// POST /api/appointment/
router.post(
  '/',
  authenticateToken,
  body('name').notEmpty().withMessage('El nombre no es válido'),
  body('date').isISO8601().withMessage('La fecha no es válida'),
  body('hour')
    .matches(/^(([0-9][0-2]?)|([0][0-9])):[0-5][0-9]$/)
    .withMessage('La hora no es válida'),
  body('reason').notEmpty().withMessage('La razón no es válida'),
  create
)
// PUT /api/appointment/:_id
router.put(
  '/:_id',
  authenticateToken,
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  body('name').notEmpty().withMessage('El nombre no es válido'),
  body('date').isISO8601().withMessage('La fecha no es válida'),
  body('hour')
    .matches(/^(([0-9][0-2]?)|([0][0-9])):[0-5][0-9]$/)
    .withMessage('La hora no es válida'),
  body('reason').notEmpty().withMessage('La razón no es válida'),
  update
)
// DELETE /api/appointment/:_id
router.delete(
  '/:_id',
  authenticateToken,
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  deleteSpecific
)

export default router
