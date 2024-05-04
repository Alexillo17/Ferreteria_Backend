import { Router } from "express";

import { UpdatEmpleado, createnewEmpleado, getEmpleadobyCedula, getEmpleadobyID, getEmpleados } from "../controllers/empleado.controller.js"

const router = Router();

router.get("/empleados", getEmpleados);

router.get("/empleados/:IDEMPLEADO", getEmpleadobyID);

router.post('/createEmpleado', createnewEmpleado);

router.put('/updateEmpleado/:IDEMPLEADO', UpdatEmpleado);

router.get("/empleadocedula/:Cedula",getEmpleadobyCedula);





export default router;