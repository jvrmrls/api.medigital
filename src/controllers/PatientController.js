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
import { authenticateToken } from '../helpers/jwt.js'

const router = Router()

// GET /api/patients/
router.get('/', authenticateToken, getAll)
// GET /api/patients/:id
router.get('/:_id', authenticateToken, getSpecific)
// POST /api/patients/
router.post(
  '/',
  authenticateToken,
  body('firstName').notEmpty().withMessage('Los nombres no son válidos'),
  body('lastName').notEmpty().withMessage('Los apellidos no son válidos'),
  body('phoneNumber')
    .isArray()
    .withMessage('Los números de teléfono no son válidos'),
  body('birthday').isDate().withMessage('La fecha de nacimiento no es válida'),
  body('responsibles').isArray().withMessage('Los responsables no son válidos'),
  body('department').isMongoId().withMessage('El departamento no es válido'),
  body('municipality').isMongoId().withMessage('El municipio no es válido'),
  create
)
// PUT /api/patients/
router.put(
  '/:_id',
  authenticateToken,
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  body('firstName').notEmpty().withMessage('Los nombres no son válidos'),
  body('lastName').notEmpty().withMessage('Los apellidos no son válidos'),
  body('phoneNumber')
    .isArray()
    .withMessage('Los números de teléfono no son válidos'),
  body('birthday').isDate().withMessage('La fecha de nacimiento no es válida'),
  body('department').isMongoId().withMessage('El departamento no es válido'),
  body('municipality').isMongoId().withMessage('El municipio no es válido'),
  body('responsibles').isArray().withMessage('Los responsables no son válidos'),
  update
)
// DELETE /api/patients/:id
router.delete(
  '/:_id',
  authenticateToken,
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  deleteSpecific
)

// POST /api/patients/responsibles
router.post(
  '/:_id/responsibles',
  authenticateToken,
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  body('firstName').notEmpty().withMessage('Los nombres no son válidos'),
  body('lastName').notEmpty().withMessage('Los apellidos no son válidos'),
  body('phoneNumber')
    .isArray()
    .withMessage('Los números de teléfono no son válidos'),
  body('kinship').notEmpty().withMessage('El parentesco no es válido'),
  addResponsible
)

// DELETE /api/patients/responsibles/:id/:responsible
router.delete(
  '/:_id/responsibles/:responsible',
  authenticateToken,
  param('_id')
    .isMongoId()
    .withMessage('El ID de paciente no es del formato correcto'),
  param('responsible')
    .isMongoId()
    .withMessage('El ID de responsable no es del formato correcto'),
  deleteResponsible
)
export default router
