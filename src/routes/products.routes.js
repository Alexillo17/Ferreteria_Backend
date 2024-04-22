import { Router } from "express";
import {
  getProducts,
  getProductbyId,
  createNewProduct,
  UpdateProduct
} from "../controllers/products.controller.js";

const router = Router();

router.get("/products", getProducts);

router.get("/products/:IDPRODUCTO", getProductbyId);

router.put("/updateproduct/:IDPRODUCTO", UpdateProduct);

router.post("/createproducts", createNewProduct)




export default router;