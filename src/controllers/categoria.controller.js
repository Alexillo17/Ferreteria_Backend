import { getConnection, sql } from "../database/connection.js";

export const getCategory = async (req,res) =>{

    try{
        const pool = await getConnection();

        const result = await pool
        .request().query('EXEC SP_MostrarCategoria ;');
    
        const category = result.recordset
    
        res.status(200).json(category);
    }catch (error){

        console.error('Error al obtener las categorias',error.message);
        res.status(500).send('Error del servidor');

    }

    
  

}