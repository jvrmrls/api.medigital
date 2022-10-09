import { Router } from 'express'
import { param } from 'express-validator'
import {
  getAll,
  getSpecific,
  getSpecificByCode
} from '../services/MunicipalityServices.js'

const router = Router()

// GET /api/municipalities/
router.get('/', getAll)
// GET /api/municipalities/:id
router.get('/:_id', param('_id').isMongoId(), getSpecific)
// GET /api/municipalities/code/:code
router.get('/code/:code', param('code').isNumeric(), getSpecificByCode)
export default router
