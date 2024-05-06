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

export const createnewCliente = async (req, res) => {
  const { Nombre, Apellido, Cedula, Estado } = req.body;

  
  try {
    const pool = await getConnection();

    const result = await pool
    .request()
    .input("Nombre", sql.VarChar(50), Nombre)
    .input("Apellido", sql.VarChar(50), Apellido)
    .input("Cedula", sql.VarChar(20), Cedula)
    .input("Estado", sql.VarChar(20), Estado)
    .query(
      "EXEC SP_IngresarCliente @Nombre, @Apellido, @Cedula, @Estado" 
    );

    res.json({
      Nombre,
      Apellido,
      Cedula,
      Estado
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getClientes = async(req,res) =>{

  try{
     
      const pool = await getConnection();

      const result = await pool
      .request().query("Exec SP_MostrarClientes")

      const cliente = result.recordset
      res.status(200).json(cliente)
  }catch(error){

      console.log('Error al obtener los clientes');
      res.status(500).send('Error del servidor');
  }
};

export const geyClientebyID = async(req, res) =>
  {
      try{
          const pool = await getConnection();
    
          const result = await pool
          .request()
          .input("IDCLIENTE", req.params.IDCLIENTE)
          .query("Exec SP_GetClientebyID @IDCLIENTE");
    
          return res.json(result.recordset[0]);
    
    
      }catch(error){
          res.status(500);
          res.send(error.message);
      }
  }

  export const updateCliente = async (req, res) => {
    const { IDCLIENTE, Nombre, Apellido, Cedula, Estado } = req.body;
  
  
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("IDCLIENTE", req.params.IDCLIENTE) // Cambiado a sql.Int
        .input("Nombre", sql.VarChar(50), Nombre)
        .input("Apellido", sql.VarChar(50), Apellido)
        .input("Cedula", sql.VarChar(20), Cedula)
        .input("Estado", sql.VarChar(20), Estado)
        .query("EXEC SP_UpdateCliente @IDCLIENTE, @Nombre, @Apellido, @Cedula, @Estado");
  
      res.json({
        Nombre,
        Apellido,
        Cedula,
        Estado,
        IDCLIENTE: req.params.IDCLIENTE
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  export const getClientebyID = async(req, res) =>
    {
        try{
            const pool = await getConnection();
      
            const result = await pool
            .request()
            .input("IDCLIENTE", req.params.IDCLIENTE)
            .query("Exec SP_GetClientebyID @IDCLIENTE");
      
            return res.json(result.recordset[0]);
      
      
        }catch(error){
            res.status(500);
            res.send(error.message);
        }
    }
    
    export const getClientesbyname = async (req, res) => {
      try {
        const pool = await getConnection();
    
        const result = await pool
        .request()
        .input("Nombre", req.params.Nombre)
        .query("Exec SP_BuscaClientebyNombre @Nombre");
    
    
    
        const clientes = result.recordset
        res.json(clientes);
    
      } catch (error) {
        res.status(500).send(error.message);
      }
    };

    export const getClientesInactivos = async(req,res) =>{

      try{
         
          const pool = await getConnection();
    
          const result = await pool
          .request().query("Exec SP_MostrarClientesInactivos")
    
          const cliente = result.recordset
          res.status(200).json(cliente)
      }catch(error){
    
          console.log('Error al obtener los clientes');
          res.status(500).send('Error del servidor');
      }
    };
    



