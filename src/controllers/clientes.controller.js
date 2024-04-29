import { getConnection, sql } from "../database/connection.js";

export const getClientebyCedula = async(req,res) =>{
    try{
        
      const pool = await getConnection();

      const result = await pool
      .request()
      .input('CEDULA', req.params.CEDULA)
      .query("Exec SP_BuscarClientePorCedula @CEDULA")

      return res.json(result.recordset[0]);

    }catch(error)
    {
        res.status(500);
        res.send(error.message)
    }
}