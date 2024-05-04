import { Router } from "express";

import{ReporteFactura, createnewDetalleFactura, createnewFactura, getFacturabyID, getUltimaFactura, EliminarProductodeFactura} from '../controllers/factura.controller.js' 

const router = Router();

router.get("/factura",ReporteFactura);

router.get('/ultimafactura',getUltimaFactura);

router.get("/factura/:IDFACTURA",getFacturabyID);

router.post("/createfactura",createnewFactura);

router.post("/createdetallefactura",createnewDetalleFactura);

router.delete("/eliminarproducto/:NumeroFactura/:IdProducto", EliminarProductodeFactura);

export default router;
