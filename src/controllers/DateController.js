import { Router } from 'express'
import { param, body } from 'express-validator'
import {
  getAll,
  getSpecific,
  create,
  update,
  deleteSpecific
} from '../services/DateServices.js'

const router = Router()

// GET /api/dates/
router.get('/', getAll)
// GET /api/dates/:_id
router.get(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  getSpecific
)
// POST /api/dates/
router.post(
  '/',
  body('name').notEmpty().withMessage('El nombre no es válido'),
  body('date').isDate().withMessage('La fecha no es válida'),
  body('hour')
    .matches(new RegExp(/^(10|11|12|[1-9]):[0-5][0-9]$/))
    .withMessage('La hora no es válida'),
  body('reason').notEmpty().withMessage('La razón no es válida'),
  create
)
// PUT /api/dates/:_id
router.put(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  body('name').notEmpty().withMessage('El nombre no es válido'),
  body('date').isDate().withMessage('La fecha no es válida'),
  body('hour')
    .matches(new RegExp(/^(10|11|12|[1-9]):[0-5][0-9]$/))
    .withMessage('La hora no es válida'),
  body('reason').notEmpty().withMessage('La razón no es válida'),
  update
)
// DELETE /api/dates/:_id
router.delete(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  deleteSpecific
)
export default router
