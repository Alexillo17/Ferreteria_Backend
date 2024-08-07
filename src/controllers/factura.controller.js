import { getConnection, sql } from "../database/connection.js";


export const ReporteFactura = async (req, res) => {
    try {
      const pool = await getConnection();
      const { pageNumber, pageSize } = req.query; 
  

      const pageNumberInt = parseInt(pageNumber, 10) || 1;
      const pageSizeInt = parseInt(pageSize, 10) || 10;
  

      const result = await pool.request().query('Exec SP_MostrarFacturas');
  

      const startIndex = (pageNumberInt - 1) * pageSizeInt;
      const endIndex = Math.min(startIndex + pageSizeInt, result.recordset.length);
  

      const facturas = result.recordset.slice(startIndex, endIndex);
  

      const response = {
        totalFacturas: result.recordset.length,
        facturas: facturas,
        totalPages: Math.ceil(result.recordset.length / pageSizeInt),
        currentPage: pageNumberInt
      };
  
      res.json(response);
    } catch (error) {
      console.log('Error al obtener la factura', error.message);
      res.status(500).send('Error del servidor');
    }
  };
  
  export const ReporteFacturaDate = async (req, res) => {
    try {
      const pool = await getConnection();
      const { pageNumber, pageSize } = req.query;
      const { FechaInicio, FechaFin } = req.params; // Obtenemos las fechas de los parámetros
  
      const pageNumberInt = parseInt(pageNumber, 10) || 1;
      const pageSizeInt = parseInt(pageSize, 10) || 10;
  
      const result = await pool.request()
        .input("FechaInicio", sql.Date, FechaInicio) // Corregimos los tipos de los parámetros
        .input("FechaFin", sql.Date, FechaFin)
        .execute('SP_MostrarFacturasFecha'); // Ejecutamos el procedimiento almacenado
  
      const startIndex = (pageNumberInt - 1) * pageSizeInt;
      const endIndex = Math.min(startIndex + pageSizeInt, result.recordset.length);
  
      const facturas = result.recordset.slice(startIndex, endIndex);
  
      const response = {
        totalFacturas: result.recordset.length,
        facturas: facturas,
        totalPages: Math.ceil(result.recordset.length / pageSizeInt),
        currentPage: pageNumberInt
      };
  
      res.json(response);
    } catch (error) {
      console.log('Error al obtener la factura', error.message);
      res.status(500).send('Error del servidor');
    }
  };

  export const ReporteFacturaDatePDF = async (req, res) => {
    try {
      const pool = await getConnection();
      const { FechaInicio, FechaFin } = req.params; // Obtenemos las fechas de los parámetros
  
      const result = await pool.request()
        .input("FechaInicio", sql.Date, FechaInicio) // Corregimos los tipos de los parámetros
        .input("FechaFin", sql.Date, FechaFin)
        .execute('SP_MostrarFacturasFecha'); // Ejecutamos el procedimiento almacenado
  
      const facturas = result.recordset;
  
      const response = {
        totalFacturas: facturas.length,
        facturas: facturas
      };
  
      res.json(response);
    } catch (error) {
      console.log('Error al obtener la factura', error.message);
      res.status(500).send('Error del servidor');
    }
  };
  
  

  export const getFacturabyID = async(req, res) =>
  {
      try{
          const pool = await getConnection();
    
          const result = await pool
          .request()
          .input("IDFACTURA", req.params.IDFACTURA)
          .query("Exec SP_VerFacturaPorID @IDFACTURA");
    
          return res.json(result.recordset);
    
    
      }catch(error){
          res.status(500);
          res.send(error.message);
      }
  }

  export const createnewFactura = async (req, res) => {
    const { IDEMPLEADO, IDCLIENTE, Fecha } = req.body;
  
    
    try {
      const pool = await getConnection();
  
      const result = await pool
      .request()
      .input("IDEMPLEADO", sql.Int, IDEMPLEADO)
      .input("IDCLIENTE", sql.Int, IDCLIENTE)
      .input("Fecha", sql.Date, Fecha)
      .query(
        "EXEC SP_IngresarFactura @IDEMPLEADO, @IDCLIENTE, @Fecha" 
      );
  
      res.json({
        IDEMPLEADO,
        IDCLIENTE,
        Fecha,
      });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const createnewDetalleFactura = async (req, res) => {
    const { NUMEROFACTURA, IDPRODUCTO, Cantidad, PrecioUnitario } = req.body;
  
    
    try {
      const pool = await getConnection();
  
      const result = await pool
      .request()
      .input("NUMEROFACTURA", sql.Int, NUMEROFACTURA)
      .input("IDPRODUCTO", sql.Int, IDPRODUCTO)
      .input("Cantidad", sql.Int, Cantidad)
      .input("PrecioUnitario", sql.Numeric(18,2), PrecioUnitario)
      .query(
        "EXEC SP_IngresarDetalleFactura @NUMEROFACTURA, @IDPRODUCTO, @Cantidad, @PrecioUnitario" 
      );
  
      res.json({
        NUMEROFACTURA,
        IDPRODUCTO,
        Cantidad,
        PrecioUnitario
      });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getUltimaFactura = async(req,res) =>{
    try{
  
      const pool  = await getConnection();
  
      const result = await pool
      .request().query("Exec SP_MostrarUltimaFactura")
  
      const factura = result.recordset
      res.status(200).json(factura);
  
    }catch(error){
      console.log('Error al obtener la factura',error.message);
          res.status(500).send('Error del servidor');
  
    }
  }

  export const EliminarProductodeFactura = async (req, res) => {
    const NumeroFactura = req.params.NumeroFactura;
    const IdProducto = req.params.IdProducto;
  
    try {
      const pool = await getConnection(); 
  
      const result = await pool
        .request()
        .input("NumeroFactura", sql.Int, NumeroFactura)
        .input("IdProducto", sql.Int, IdProducto)
        .query("EXEC SP_EliminarProductodeFactura @NumeroFactura, @IdProducto");
  
      res.json({
        NumeroFactura,
        IdProducto,
        message: 'Producto eliminado correctamente'
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const deletefactura = async (req, res) => {
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("NumFactura", req.params.NumFactura)
        .query("Exec SP_EliminarFactura @NumFactura");
  
      if (result.rowsAffected[0] === 0) return res.sendStatus(404);
  
      return res.sendStatus(204);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const UpdateCantidadFactura = async (req, res) => {
    const { Cantidad, NumeroFactura, IdProducto} = req.body;
  
  
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("NumeroFactura", req.params.NumeroFactura) // Cambiado a sql.Int
        .input("IdProducto", req.params.IdProducto) // Cambiado a sql.Int
        .input("Cantidad", sql.Int, Cantidad)
        .query("EXEC SP_EditarCantidadFactura @NumeroFactura, @IdProducto, @Cantidad");
  
      res.json({
       Cantidad,
       NumeroFactura: req.params.NumeroFactura,
      IdProducto: req.params.IdProducto
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };