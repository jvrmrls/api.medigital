import { Router } from 'express'
import { param } from 'express-validator'
import {
    getAll,
    getSpecific,
} from '../services/ToolServices.js'

const router = Router()

// GET /api/tools/
router.get('/', getAll)
// GET /api/tools/:id
router.get(
    '/:_id',
    param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
    getSpecific
    )
export default router
