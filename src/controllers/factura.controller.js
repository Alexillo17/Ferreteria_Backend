import { getConnection, sql } from "../database/connection.js";


export const ReporteFactura = async (req, res) => {
    try {
      const pool = await getConnection();
      const { pageNumber, pageSize } = req.query; 
  
      // Convertir a números y establecer valores predeterminados si no se proporcionan
      const pageNumberInt = parseInt(pageNumber, 10) || 1;
      const pageSizeInt = parseInt(pageSize, 10) || 10;
  
      // Ejecutar el procedimiento almacenado
      const result = await pool.request().query('Exec SP_MostrarFacturas');
  
      // Calcular el índice de inicio y final de los datos para la página actual
      const startIndex = (pageNumberInt - 1) * pageSizeInt;
      const endIndex = Math.min(startIndex + pageSizeInt, result.recordset.length);
  
      // Obtener las facturas para la página actual
      const facturas = result.recordset.slice(startIndex, endIndex);
  
      // Construir el objeto de respuesta
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
  

