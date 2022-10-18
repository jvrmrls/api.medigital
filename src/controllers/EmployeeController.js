import { Router } from 'express'
import { param, body } from 'express-validator'
import {
  getAll,
  getSpecific,
  create,
  update,
  deleteSpecific,
  auth
} from '../services/EmployeeServices.js'

const router = Router()

// GET /api/employees/
router.get('/', getAll)
// GET /api/employees/:id
router.get(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  getSpecific
)
// POST /api/employees/
router.post(
  '/',
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
/* router.put(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  body('username').notEmpty().withMessage('El nombre de usuario es requerido'),
  update
) */
// DELETE /api/employees/:_id
/* router.delete(
  '/:_id',
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  deleteSpecific
) */

export default router
