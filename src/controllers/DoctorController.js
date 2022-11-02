import { Router } from 'express'
import { param, body } from 'express-validator'
import {
  getAll,
  getSpecific,
  create,
  update,
  deleteSpecific
} from '../services/DoctorServices.js'

const router = Router()

// GET /api/doctors/
router.get('/', getAll)
// GET /api/doctors/:id
router.get(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  getSpecific
)
// POST /api/doctors/
router.post(
  '/',
  body('employee')
    .isMongoId()
    .withMessage('El ID de empleado no es del formato correcto'),
  create
)
// PUT /api/doctors/:_id
router.put(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  body('employee')
    .isMongoId()
    .withMessage('El ID de empleado no es del formato correcto'),
  update
)
// DELETE /api/doctors/:_id
router.delete(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  deleteSpecific
)

export default router
