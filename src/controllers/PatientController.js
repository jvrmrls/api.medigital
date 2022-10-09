import { Router } from 'express'
import { body, param } from 'express-validator'
import {
  getAll,
  getSpecific,
  create,
  update,
  deleteSpecific,
  addResponsible,
  deleteResponsible
} from '../services/PatientServices.js'

const router = Router()

// GET /api/patients/
router.get('/', getAll)
// GET /api/patients/:id
router.get('/:_id', getSpecific)
// POST /api/patients/
router.post(
  '/',
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('phoneNumber').isArray(),
  body('birthday').isDate(),
  body('responsibles').isArray(),
  create
)
// PUT /api/patients/
router.put(
  '/:_id',
  param('_id').isMongoId(),
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('phoneNumber').isArray(),
  body('birthday').isDate(),
  body('responsibles').isArray(),
  update
)
// DELETE /api/patients/:id
router.delete('/:_id', param('_id').isMongoId(), deleteSpecific)

// POST /api/patients/responsibles
router.post(
  '/:_id/responsibles',
  param('_id').isMongoId(),
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('phoneNumber').isArray(),
  body('kinship').notEmpty(),
  addResponsible
)

// DELETE /api/patients/responsibles/:id/:responsible
router.delete(
  '/:_id/responsibles/:responsible',
  param('_id').isMongoId(),
  param('responsible').isMongoId(),
  deleteResponsible
)
export default router
