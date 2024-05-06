import { Router } from "express";
import {
  getProductswithPagination,
  getProductbyId,
  createNewProduct,
  UpdateProduct,
  GetProductbyNamewithPagination,
  getAllProducts,
  getAllProductsbyName,
  getProductsInactivoswithPagination,
  Eliminarproducto,
  GetProductInactivosbyNamewithPagination
} from "../controllers/products.controller.js";

const router = Router();

router.get("/products", getProductswithPagination);

router.get("/productsinactivos", getProductsInactivoswithPagination);

router.get("/allproducts", getAllProducts);

router.get("/allproducts/:NOMBRE",getAllProductsbyName);

router.get("/products/:IDPRODUCTO", getProductbyId);

router.put("/updateproduct/:IDPRODUCTO", UpdateProduct);

router.put("/EliminarProducto/:IDPRODUCTO", Eliminarproducto);

router.post("/createproducts", createNewProduct);

router.get("/buscarproducts/:NOMBRE", GetProductbyNamewithPagination);

router.get("/buscarproductsinactivos/:NOMBRE", GetProductInactivosbyNamewithPagination);




export default router;