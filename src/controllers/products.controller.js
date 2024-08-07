import { getConnection, sql } from "../database/connection.js";

export const getProductswithPagination = async (req, res) => {
  try {
    const pool = await getConnection();
    const { pageNumber, pageSize } = req.query; 

    // Convertir a números y establecer valores predeterminados si no se proporcionan
    const pageNumberInt = parseInt(pageNumber, 10) || 1;
    const pageSizeInt = parseInt(pageSize, 10) || 10;

    // Obtener todos los productos de la bd
    const result = await pool.request().query("SP_MostrarProducto");

    // Calcular el índice de inicio y final de los datos para la página actual
    const startIndex = (pageNumberInt - 1) * pageSizeInt;
    const endIndex = Math.min(startIndex + pageSizeInt, result.recordset.length);

    // Obtener los productos para la página actual
    const products = result.recordset.slice(startIndex, endIndex);

    // Construir el objeto de respuesta
    const response = {
      totalItems: result.recordset.length,
      products: products,
      totalPages: Math.ceil(result.recordset.length / pageSizeInt),
      currentPage: pageNumberInt
    };

    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getProductsInactivoswithPagination = async (req, res) => {
  try {
    const pool = await getConnection();
    const { pageNumber, pageSize } = req.query; 

    // Convertir a números y establecer valores predeterminados si no se proporcionan
    const pageNumberInt = parseInt(pageNumber, 10) || 1;
    const pageSizeInt = parseInt(pageSize, 10) || 10;

    // Obtener todos los productos de la bd
    const result = await pool.request().query("SP_MostrarProdutoInactivo");

    // Calcular el índice de inicio y final de los datos para la página actual
    const startIndex = (pageNumberInt - 1) * pageSizeInt;
    const endIndex = Math.min(startIndex + pageSizeInt, result.recordset.length);

    // Obtener los productos para la página actual
    const products = result.recordset.slice(startIndex, endIndex);

    // Construir el objeto de respuesta
    const response = {
      totalItems: result.recordset.length,
      products: products,
      totalPages: Math.ceil(result.recordset.length / pageSizeInt),
      currentPage: pageNumberInt
    };

    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getProductbyId = async(req,res) => {
  try{
      const pool = await getConnection();

      const result = await pool
      .request()
      .input("IDPRODUCTO", req.params.IDPRODUCTO)
      .query("Exec SP_ObtenerProdcutoPorID @IDPRODUCTO");

      return res.json(result.recordset[0]);


  }catch(error){
      res.status(500);
      res.send(error.message);
  }
};

export const createNewProduct = async (req, res) => {
  const { NOMBRE, UNIDADES, PRECIO, ESTADO, IDCATEGORIA, IDPROVEEDOR, Stock, Fecha } = req.body;

  if (NOMBRE == null || UNIDADES == null || PRECIO == null || ESTADO == null || IDCATEGORIA == null || IDPROVEEDOR== null || Stock == null || Fecha == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
    .request()
    .input("NOMBRE", sql.NVarChar(70), NOMBRE)
    .input("UNIDADES", sql.VarChar(50), UNIDADES)
    .input("PRECIO", sql.Numeric(18,2), PRECIO)
    .input("ESTADO", sql.VarChar, ESTADO)
    .input("IDCATEGORIA", sql.Int, IDCATEGORIA)
    .input("IDPROVEEDOR", sql.Int, IDPROVEEDOR)
    .input("Stock", sql.Int, Stock)
    .input("Fecha", sql.Date, Fecha)
    .query(
      "EXEC SP_InsertarProducto @NOMBRE, @UNIDADES, @PRECIO, @ESTADO, @IDCATEGORIA, @IDPROVEEDOR, @Stock, @Fecha" 
    );

    res.json({
      NOMBRE,
      UNIDADES,
      PRECIO,
      ESTADO,
      IDCATEGORIA,
      IDPROVEEDOR,
      Stock,
      Fecha
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createregistroProduct = async (req, res) => {
  const { idProducto, Cantidad, Fecha } = req.body;

  if (idProducto == null || Cantidad == null || Fecha == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
    .request()
    .input("idProducto", sql.Int, idProducto)
    .input("Cantidad", sql.Int, Cantidad)
    .input("Fecha", sql.Date, Fecha)
    .query(
      "EXEC SP_InsertarRegistro  @idProducto, @Cantidad, @Fecha" 
    );

    res.json({
idProducto,
Cantidad,
 Fecha
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


export const UpdateProduct = async (req, res) =>{
  const { NOMBRE, UNIDADES, PRECIO, ESTADO, IDCATEGORIA, IDPROVEEDOR, Stock, Fecha } = req.body;

  if (NOMBRE == null || UNIDADES == null || PRECIO == null || ESTADO == null || IDCATEGORIA == null || IDPROVEEDOR== null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try{
    const pool = await getConnection();

    const result = await pool
    .request()
    .input("IDPRODUCTO", req.params.IDPRODUCTO)
    .input("NOMBRE", sql.NVarChar(70), NOMBRE)
    .input("UNIDADES", sql.VarChar(50), UNIDADES)
    .input("PRECIO", sql.Numeric(18,2), PRECIO)
    .input("ESTADO", sql.VarChar, ESTADO)
    .input("IDCATEGORIA", sql.Int, IDCATEGORIA)
    .input("IDPROVEEDOR", sql.Int, IDPROVEEDOR)
    .query(
      "EXEC SP_ActualizarProducto  @IDPRODUCTO, @NOMBRE, @UNIDADES, @PRECIO, @ESTADO, @IDCATEGORIA, @IDPROVEEDOR"
    );

    if(result.rowsAffected[0] === 0 )return res.sendStatus(404);

    res.json({
      NOMBRE,
      UNIDADES,
      PRECIO,
      ESTADO,
      IDCATEGORIA,
      IDPROVEEDOR,
      IDPRODUCTO: req.params.IDPRODUCTO
    });
  }catch(error){
    res.status(500);
    res.send(error.message);
  }

}


export const GetProductbyNamewithPagination = async (req, res) => {
  try {
    const pool = await getConnection();
    const { pageNumber, pageSize } = req.query; 

    const pageNumberInt = parseInt(pageNumber, 10) || 1;
    const pageSizeInt = parseInt(pageSize, 10) || 10;

    const result = await pool
    .request()
    .input("NOMBRE", req.params.NOMBRE)
    .query("Exec SP_MostrarProductoporNombre @NOMBRE");


    const startIndex = (pageNumberInt - 1) * pageSizeInt;
    const endIndex = Math.min(startIndex + pageSizeInt, result.recordset.length);


    const products = result.recordset.slice(startIndex, endIndex);


    const response = {
      totalItems: result.recordset.length,
      products: products,
      totalPages: Math.ceil(result.recordset.length / pageSizeInt),
      currentPage: pageNumberInt
    };

    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const GetProductInactivosbyNamewithPagination = async (req, res) => {
  try {
    const pool = await getConnection();
    const { pageNumber, pageSize } = req.query; 

    const pageNumberInt = parseInt(pageNumber, 10) || 1;
    const pageSizeInt = parseInt(pageSize, 10) || 10;

    const result = await pool
    .request()
    .input("NOMBRE", req.params.NOMBRE)
    .query("Exec SP_MostrarProductoInactivoporNombre @NOMBRE");


    const startIndex = (pageNumberInt - 1) * pageSizeInt;
    const endIndex = Math.min(startIndex + pageSizeInt, result.recordset.length);


    const products = result.recordset.slice(startIndex, endIndex);


    const response = {
      totalItems: result.recordset.length,
      products: products,
      totalPages: Math.ceil(result.recordset.length / pageSizeInt),
      currentPage: pageNumberInt
    };

    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};




export const getAllProducts = async(req,res) =>{
  try{

    const pool  = await getConnection();

    const result = await pool
    .request().query("Exec SP_MostrarProductoExistencia")

    const product = result.recordset
    res.status(200).json(product);

  }catch(error){
    console.log('Error al obtener los productos',error.message);
        res.status(500).send('Error del servidor');

  }
}

export const getAllProductsActivo = async(req,res) =>{
  try{

    const pool  = await getConnection();

    const result = await pool
    .request().query("Exec SP_MostrarProducto")

    const product = result.recordset
    res.status(200).json(product);

  }catch(error){
    console.log('Error al obtener los productos',error.message);
        res.status(500).send('Error del servidor');

  }
}

export const getRegistroAllProducts = async(req,res) =>{
  try{

    const pool  = await getConnection();

    const result = await pool
    .request().query("Exec SP_MostrarTodosLosProducto")

    const product = result.recordset
    res.status(200).json(product);

  }catch(error){
    console.log('Error al obtener los productos',error.message);
        res.status(500).send('Error del servidor');

  }
}

export const getAllProductsbyName = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
    .request()
    .input("NOMBRE", req.params.NOMBRE)
    .query("Exec SP_MostrarProductoporNombre @NOMBRE");



    const products = result.recordset
    res.json(products);

  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getAllProductsbyNameProveedor = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
    .request()
    .input("NOMBRE", req.params.NOMBRE)
    .input("idProveedor", req.params.idProveedor)
    .query("Exec SP_MostrarTodosLosProductoConsulta @NOMBRE, @idProveedor");

    const products = result.recordset
    res.json(products);

  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getAllProductsbyProveedor = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
    .request()
    .input("idProveedor", req.params.idProveedor)
    .query("Exec SP_MostrarTodosLosProductoConsultaProveedor @idProveedor");

    const products = result.recordset
    res.json(products);

  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const Eliminarproducto = async(req, res) =>
  {
      try{
          const pool = await getConnection();
    
          const result = await pool
          .request()
          .input("IDPRODUCTO", req.params.IDPRODUCTO)
          .query("Exec SP_DardebajaProducto @IDPRODUCTO");
    
  
        return res.json({ message: "Producto Eliminado" });
          
    
    
      }catch(error){
          res.status(500);
          res.send(error.message);
      }
  }

  export const GetProductsByDateWithPagination = async (req, res) => {
    try {
      const pool = await getConnection();
      const { pageNumber, pageSize, fechaInicio, fechaFin } = req.query; 
      const nombre = req.query.nombre || null;
  
      const pageNumberInt = parseInt(pageNumber, 10) || 1;
      const pageSizeInt = parseInt(pageSize, 10) || 10;
  
      const result = await pool
      .request()
      .input("Nombre", nombre)
      .input("FechaInicio", fechaInicio)
      .input("FechaFin", fechaFin)
      .query("Exec SP_MostrarProductosFecha @Nombre, @FechaInicio, @FechaFin");
  
      const startIndex = (pageNumberInt - 1) * pageSizeInt;
      const endIndex = Math.min(startIndex + pageSizeInt, result.recordset.length);
  
      const products = result.recordset.slice(startIndex, endIndex);
  
      const response = {
        totalItems: result.recordset.length,
        products: products,
        totalPages: Math.ceil(result.recordset.length / pageSizeInt),
        currentPage: pageNumberInt
      };
  
      res.json(response);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  

