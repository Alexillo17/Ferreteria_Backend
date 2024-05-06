import { Router } from "express";
import { createnewCliente, getClientebyCedula, getClientes, getClientebyID, updateCliente, getClientesbyname, getClientesInactivos, getClientesInactivosbyname, EliminarCliente } from "../controllers/clientes.controller.js";

const router = Router();


router.get('/cliente/:CEDULA',getClientebyCedula);

router.post('/createcliente',createnewCliente);

router.get('/cliente',getClientes);

router.get('/clienteinactivo',getClientesInactivos);

router.get('/clientebyid/:IDCLIENTE',getClientebyID);

router.put('/updatecliente/:IDCLIENTE',updateCliente);

router.get('/clientebyname/:Nombre',getClientesbyname);

router.get('/clienteinactivosbyname/:Nombre',getClientesInactivosbyname);

router.put('/eliminarcliente/:IDCLIENTE',EliminarCliente);




export default router;