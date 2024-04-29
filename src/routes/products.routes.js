import { Router } from "express";
import {
  getProductswithPagination,
  getProductbyId,
  createNewProduct,
  UpdateProduct,
  GetProductbyNamewithPagination,
  getAllProducts,
  getAllProductsbyName
} from "../controllers/products.controller.js";

const router = Router();

router.get("/products", getProductswithPagination);

router.get("/allproducts", getAllProducts);

router.get("/allproducts/:NOMBRE",getAllProductsbyName);

router.get("/products/:IDPRODUCTO", getProductbyId);

router.put("/updateproduct/:IDPRODUCTO", UpdateProduct);

router.post("/createproducts", createNewProduct);

router.get("/buscarproducts/:NOMBRE", GetProductbyNamewithPagination);




export default router;