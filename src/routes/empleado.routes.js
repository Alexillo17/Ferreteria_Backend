import { Router } from "express";

import { EliminarEmpleado, UpdatEmpleado, createnewEmpleado, getEmpleadobyCedula, getEmpleadobyID, getEmpleados, getEmpleadosInactivos } from "../controllers/empleado.controller.js"

const router = Router();

router.get("/empleados", getEmpleados);

router.get("/empleadosinactivos", getEmpleadosInactivos);

router.get("/empleados/:IDEMPLEADO", getEmpleadobyID);

router.post('/createEmpleado', createnewEmpleado);

router.put('/updateEmpleado/:IDEMPLEADO', UpdatEmpleado);

router.put('/eliminarempleado/:IDEMPLEADO', EliminarEmpleado);

router.get("/empleadocedula/:Cedula",getEmpleadobyCedula);





export default router;