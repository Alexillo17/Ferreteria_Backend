import { Router } from "express";
import { createnewCliente, getClientebyCedula, getClientes, getClientebyID, updateCliente } from "../controllers/clientes.controller.js";

const router = Router();


router.get('/cliente/:CEDULA',getClientebyCedula);

router.post('/createcliente',createnewCliente);

router.get('/cliente',getClientes);

router.get('/clientebyid/:IDCLIENTE',getClientebyID);

router.put('/updatecliente/:IDCLIENTE',updateCliente);




export default router;