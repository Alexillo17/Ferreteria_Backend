import { Router } from "express";

import {getProveedorActivo,createnewProveedor, getProveedorbyID, updateProveedor,DeleteProveedor,
    getAllProveedores, 
    getProveedorbyCedula
} from "../controllers/proveedor.controller.js";

const router = Router();

router.get("/proveedor",getProveedorActivo);

router.get("/allproveedor", getAllProveedores);

router.post("/createproveedor", createnewProveedor);

router.get("/proveedor/:IDPROVEEDOR",getProveedorbyID);

router.put("/updateproveedor/:IDPROVEEDOR", updateProveedor);

router.put("/deleteproveedor/:IDPROVEEDOR",DeleteProveedor);

router.get("/proveedorcedula/:Cedula", getProveedorbyCedula)

export default router;