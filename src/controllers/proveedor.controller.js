import { getConnection, sql } from "../database/connection.js";

export const getProveedorActivo = async (req,res) =>
{
    try{
        
        const pool = await getConnection();

        const result = await pool
        .request().query('EXEC SP_MostraProveedorActivo')

        const proveedor = result.recordset

        res.status(200).json(proveedor)
    }catch(error){

        console.log('Error al obtener los proveedores',error.message);
        res.status(500).send('Error del servidor');


    }
}

export const getAllProveedores = async(req,res) =>{
  try{

    const pool  = await getConnection();

    const result = await pool
    .request().query("Exec SP_MostrarProveedor")

    const proveedor = result.recordset
    res.status(200).json(proveedor);

  }catch(error){
    console.log('Error al obtener los proveedores',error.message);
        res.status(500).send('Error del servidor');

  }
}

export const getProveedorbyID = async(req, res) =>
{
    try{
        const pool = await getConnection();
  
        const result = await pool
        .request()
        .input("IDPROVEEDOR", req.params.IDPROVEEDOR)
        .query("Exec SP_MostrarProveedorbyID @IDPROVEEDOR");
  
        return res.json(result.recordset[0]);
  
  
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

export const createnewProveedor = async (req, res) => {
    const {IDPROVEEDOR, Nombre, Apellido, Correo,Telefono, Cedula, Estado } = req.body;
  
    if (Nombre == null || Apellido == null || Correo == null || Telefono == null || Cedula == null || IDPROVEEDOR== null || Estado == null) {
      return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }
  
    try {
      const pool = await getConnection();
  
      const result = await pool
      .request()
      .input("IDPROVEEDOR", sql.Int, IDPROVEEDOR)
      .input("Nombre", sql.VarChar(50), Nombre)
      .input("Apellido", sql.VarChar(50), Apellido)
      .input("Correo", sql.VarChar(50), Correo)
      .input("Telefono", sql.Int, Telefono)
      .input("Cedula", sql.VarChar(20), Cedula)
      .input("Estado", sql.VarChar(20), Estado)
      .query(
        "EXEC SP_InsertarProveedor @IDPROVEEDOR, @Nombre , @Apellido, @Correo, @Telefono, @Cedula, @Estado" 
      );
  
      res.json({
        IDPROVEEDOR,
        Nombre,
        Apellido,
        Correo,
        Telefono,
        Cedula, 
        Estado
      });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const updateProveedor = async (req, res) => {
    const {IDPROVEEDOR, Nombre, Apellido, Correo,Telefono, Cedula, Estado } = req.body;
  
    if (Nombre == null || Apellido == null || Correo == null || Telefono == null || Cedula == null || IDPROVEEDOR== null || Estado== null) {
      return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }
  
    try {
      const pool = await getConnection();
  
      const result = await pool
      .request()
      .input("IDPROVEEDOR", sql.Int, IDPROVEEDOR)
      .input("Nombre", sql.VarChar(50), Nombre)
      .input("Apellido", sql.VarChar(50), Apellido)
      .input("Correo", sql.VarChar(50), Correo)
      .input("Telefono", sql.Int, Telefono)
      .input("Cedula", sql.VarChar(20), Cedula)
      .input("Estado", sql.VarChar(20), Estado)
      .query(
        "EXEC SP_UpdateProveedor @IDPROVEEDOR, @Nombre , @Apellido, @Correo, @Telefono, @Cedula, @Estado" 
      );
  
      res.json({
        IDPROVEEDOR,
        Nombre,
        Apellido,
        Correo,
        Telefono,
        Cedula, 
        Estado
      });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const DeleteProveedor = async(req, res) =>
{
    try{
        const pool = await getConnection();
  
        const result = await pool
        .request()
        .input("IDPROVEEDOR", req.params.IDPROVEEDOR)
        .query("Exec SP_EliminarProveedor @IDPROVEEDOR");
  

      return res.json({ message: "Proveedor Eliminado" });
        
  
  
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}



