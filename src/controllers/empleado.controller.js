import { getConnection, sql } from "../database/connection.js";

export const getEmpleados = async(req,res) =>{

    try{
       
        const pool = await getConnection();

        const result = await pool
        .request().query("Exec SP_MostrarEmpleados")

        const empleado = result.recordset
        res.status(200).json(empleado)
    }catch(error){

        console.log('Error al obtener los empleados');
        res.status(500).send('Error del servidor');
    }
}

export const getEmpleadobyID = async(req,res) =>{
    try{
        
      const pool = await getConnection();

      const result = await pool
      .request()
      .input('IDEMPLEADO', req.params.IDEMPLEADO)
      .query("Exec SP_MostrarEmpleadobyID @IDEMPLEADO")

      return res.json(result.recordset[0]);

    }catch(error)
    {
        res.status(500);
        res.send(error.message)
    }
}

export const createnewEmpleado = async(req, res) => {
   const {IDEMPLEADO, Nombre, Apellido, Cedula, Telefono} = req.body;

   if(Nombre == null || Cedula == null || Telefono == null) {
    return res,status(400),json({msg:  'Bad Rquest'})
   }

    try{
       const pool = await getConnection();
       
       const result = await pool
       .request()
       .input("IDEMPLEADO", sql.Int, IDEMPLEADO)
       .input('Nombre', sql.VarChar(50), Nombre)
       .input('Apellido', sql.VarChar(50), Apellido)
       .input('Cedula', sql.VarChar(50), Cedula)
       .input('Telefono', sql.Int,Telefono)
       .query(
        "Exec SP_IngresarEmpleado @IDEMPLEADO, @Nombre, @Apellido, @Cedula, @Telefono"
       );

       res.json({
        IDEMPLEADO,
        Nombre,
        Apellido,
        Cedula,
        Telefono
       });



    }catch(error){
        res.status(500);
        res.send(error.message);
        
    }
}

export const UpdatEmpleado = async(req, res) => {
    const {IDEMPLEADO, Nombre, Apellido, Cedula, Telefono} = req.body;
 
    if(Nombre == null || Cedula == null || Telefono == null) {
     return res,status(400),json({msg:  'Bad Rquest'})
    }
 
     try{
        const pool = await getConnection();
        
        const result = await pool
        .request()
        .input("IDEMPLEADO", sql.Int, IDEMPLEADO)
        .input('Nombre', sql.VarChar(50), Nombre)
        .input('Apellido', sql.VarChar(50), Apellido)
        .input('Cedula', sql.VarChar(50), Cedula)
        .input('Telefono', sql.Int,Telefono)
        .query(
         "Exec SP_UpdateEmpleado @IDEMPLEADO, @Nombre, @Apellido, @Cedula, @Telefono"
        );
 
        res.json({
         IDEMPLEADO,
         Nombre,
         Apellido,
         Cedula,
         Telefono
        });
 
 
 
     }catch(error){
         res.status(500);
         res.send(error.message);
         
     }
 }

 export const getEmpleadobyCedula = async(req,res) =>{
    try{
        
      const pool = await getConnection();
  
      const result = await pool
      .request()
      .input('Cedula', req.params.Cedula)
      .query("Exec SP_BuscarCedulaExistenteEmpleado @Cedula")
  
      return res.json(result.recordset[0]);
  
    }catch(error)
    {
        res.status(500);
        res.send(error.message)
    }
  }
 

