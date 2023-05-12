import { Router } from "express";
import { create } from "../services/CompanyServices.js"
import { body } from 'express-validator'
import { authenticateToken } from '../helpers/jwt.js'

const router = Router();

router.post(
    '/',
    authenticateToken,
    body('name').notEmpty().withMessage("El nombre es requerido"),
    create
    );

export default router;