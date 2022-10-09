import { Router } from 'express'
import { param } from 'express-validator'
import {
  getAll,
  getSpecific,
  getSpecificByCode
} from '../services/DepartmentsServices.js'

const router = Router()

// GET /api/departments/
router.get('/', getAll)
// GET /api/departments/:id
router.get('/:_id', param('_id').isMongoId(), getSpecific)
// GET /api/departments/code/:code
router.get('/code/:code', param('code').isNumeric(), getSpecificByCode)
export default router
