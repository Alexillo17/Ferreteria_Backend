import { Router } from "express";

import { getProveedor } from "../controllers/proveedor.controller.js";

const router = Router();

router.get("/proveedor",getProveedor);

export default router;