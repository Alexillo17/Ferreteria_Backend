import { Router } from "express";

import{ReporteFactura, createnewDetalleFactura, createnewFactura, getFacturabyID, getUltimaFactura, EliminarProductodeFactura, deletefactura, ReporteFacturaDate, UpdateCantidadFactura, ReporteFacturaDatePDF} from '../controllers/factura.controller.js' 

const router = Router();

router.get("/factura",ReporteFactura);

router.get("/facturasbyDate/:FechaInicio/:FechaFin",ReporteFacturaDate);

router.get("/facturasbyDatePDF/:FechaInicio/:FechaFin",ReporteFacturaDatePDF);

router.get('/ultimafactura',getUltimaFactura);

router.get("/factura/:IDFACTURA",getFacturabyID);

router.post("/createfactura",createnewFactura);

router.post("/createdetallefactura",createnewDetalleFactura);

router.delete("/eliminarproducto/:NumeroFactura/:IdProducto", EliminarProductodeFactura);

router.delete("/eliminarfactura/:NumFactura",deletefactura);

router.put("/editarcantidad/:NumeroFactura/:IdProducto",UpdateCantidadFactura);

export default router;
