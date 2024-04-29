import { Router } from "express";

import{ReporteFactura, createnewDetalleFactura, createnewFactura, getFacturabyID, getUltimaFactura} from '../controllers/factura.controller.js' 

const router = Router();

router.get("/factura",ReporteFactura);

router.get('/ultimafactura',getUltimaFactura);

router.get("/factura/:IDFACTURA",getFacturabyID);

router.post("/createfactura",createnewFactura);

router.post("/createdetallefactura",createnewDetalleFactura);

export default router;
