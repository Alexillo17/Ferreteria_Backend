import { Router } from "express";

import{ReporteFactura} from '../controllers/factura.controller.js' 

const router = Router();

router.get("/factura",ReporteFactura);

export default router;
