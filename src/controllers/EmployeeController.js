import { Router } from 'express'
import { param, body } from 'express-validator'
import {
  getAll,
  getSpecific,
  create,
  update,
  deleteSpecific
} from '../services/EmployeeServices.js'
import { authenticateToken } from '../helpers/jwt.js'

const router = Router()

// GET /api/employees/
router.get('/', authenticateToken, getAll)
// GET /api/employees/:id
router.get(
  '/:_id',
  authenticateToken,
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  getSpecific
)
// POST /api/employees/
router.post(
  '/',
  authenticateToken,
  body('firstName').notEmpty().withMessage('Los nombres son requeridos'),
  body('lastName').notEmpty().withMessage('Los apellidos son requeridos'),
  body('dui').notEmpty().withMessage('El DUI es requerido'),
  body('department')
    .isMongoId()
    .withMessage('El ID de departamento no es del formato correcto'),
  body('municipality')
    .isMongoId()
    .withMessage('El ID de municipio no es del formato correcto'),
  create
)
// PUT /api/employees/:_id
router.put(
  '/:_id',
  authenticateToken,
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  body('firstName').notEmpty().withMessage('Los nombres son requeridos'),
  body('lastName').notEmpty().withMessage('Los apellidos son requeridos'),
  body('dui').notEmpty().withMessage('El DUI es requerido'),
  body('department')
    .isMongoId()
    .withMessage('El ID de departamento no es del formato correcto'),
  body('municipality')
    .isMongoId()
    .withMessage('El ID de municipio no es del formato correcto'),
  update
)
// DELETE /api/employees/:_id
router.delete(
  '/:_id',
  authenticateToken,
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  deleteSpecific
)

export default router
