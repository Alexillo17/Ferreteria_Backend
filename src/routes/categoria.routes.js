import { Router } from "express";

import{getCategory} from '../controllers/categoria.controller.js' 


const router = Router();

router.get("/category",getCategory);

export default router;