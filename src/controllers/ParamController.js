import { Router } from "express";
import {getParams} from "../services/ParamServices.js"

const router = Router();

router.get('/', getParams);

export default router;