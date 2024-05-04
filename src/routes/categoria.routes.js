import { Router } from "express";

import{DeleteCategoria, createnewCategoria, getAllCategory, getCategoriabyID, getCategory, updatecategoria} from '../controllers/categoria.controller.js' 


const router = Router();

router.get("/category",getCategory);

router.get('/allcategory',getAllCategory);

router.get('/category/:IDCATEGORIA',getCategoriabyID);

router.post('/crearcategoria',createnewCategoria); 

router.put('/updatecategoria/:IDCATEGORIA', updatecategoria);

router.put('/eliminarcategoria/:IDCATEGORIA', DeleteCategoria);

export default router;