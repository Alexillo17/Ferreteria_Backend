import { getConnection, sql } from "../database/connection.js";

export const getProveedor = async (req,res) =>
{
    try{
        
        const pool = await getConnection();

        const result = await pool
        .request().query('EXEC SP_MostrarProveedor')

        const proveedor = result.recordset

        res.status(200).json(proveedor)
    }catch(error){

        console.log('Error al obtener los proveedores',error.message);
        res.status(500).send('Error del servidor');


    }
}