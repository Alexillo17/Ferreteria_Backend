import { Router } from "express";
import { getClientebyCedula } from "../controllers/clientes.controller.js";

const router = Router();


router.get('/cliente/:CEDULA',getClientebyCedula);

export default router;