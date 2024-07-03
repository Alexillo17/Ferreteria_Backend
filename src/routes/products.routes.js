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
  GetProductInactivosbyNamewithPagination,
  GetProductsByDateWithPagination,
  getRegistroAllProducts,
  getAllProductsbyNameProveedor,
  createregistroProduct,
  getAllProductsActivo
} from "../controllers/products.controller.js";

const router = Router();

router.get("/products", getProductswithPagination);

router.get("/productsinactivos", getProductsInactivoswithPagination);

router.get("/allproducts", getAllProducts);

router.get("/allproductsactivo", getAllProductsActivo);

router.get("/allproducts/:NOMBRE",getAllProductsbyName);

router.get("/products/:IDPRODUCTO", getProductbyId);

router.put("/updateproduct/:IDPRODUCTO", UpdateProduct);

router.put("/EliminarProducto/:IDPRODUCTO", Eliminarproducto);

router.post("/createproducts", createNewProduct);

router.get("/buscarproducts/:NOMBRE", GetProductbyNamewithPagination);

router.get("/buscarproductsinactivos/:NOMBRE", GetProductInactivosbyNamewithPagination);

router.get("/buscarproductosfecha", GetProductsByDateWithPagination);

router.get("/AllProducttsRegister",getRegistroAllProducts);

router.get("/SearchbyProveedor/:NOMBRE/:idProveedor",getAllProductsbyNameProveedor);

router.get("/SearchProductbyProveedor/:idProveedor",getAllProductsbyNameProveedor);

router.post("/createregistroproduct",createregistroProduct);



export default router;