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

export const getAllCategory = async (req,res) =>{

  try{
      const pool = await getConnection();

      const result = await pool
      .request().query('EXEC SP_MostrarAllCategoria;');
  
      const category = result.recordset
  
      res.status(200).json(category);
  }catch (error){

      console.error('Error al obtener las categorias',error.message);
      res.status(500).send('Error del servidor');

  }
}

export const getCategoriabyID = async(req, res) =>
{
    try{
        const pool = await getConnection();
  
        const result = await pool
        .request()
        .input("IDCATEGORIA", req.params.IDCATEGORIA)
        .query("Exec SP_MostrarCategoriabyID @IDCATEGORIA");
  
        return res.json(result.recordset[0]);
  
  
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

export const createnewCategoria = async (req, res) => {
    const {IDCATEGORIA, Nombre, Estado } = req.body;
  
    if (Nombre == null || IDCATEGORIA== null ) {
      return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }
  
    try {
      const pool = await getConnection();
  
      const result = await pool
      .request()
      .input("IDCATEGORIA", sql.Int, IDCATEGORIA)
      .input("Nombre", sql.VarChar(50), Nombre)
      .input("Estado", sql.VarChar(20), Estado)
      .query(
        "EXEC SP_IngresarCategoria @Nombre, @IDCATEGORIA, @Estado" 
      );
  
      res.json({
        IDCATEGORIA,
        Nombre,
      });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const updatecategoria = async (req, res) => {
    const {IDCATEGORIA, Nombre, Estado } = req.body;
  
    if (Nombre == null || IDCATEGORIA== null || Estado==null ) {
      return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }
  
    try {
      const pool = await getConnection();
  
      const result = await pool
      .request()
      .input("IDCATEGORIA", sql.Int, IDCATEGORIA)
      .input("Nombre", sql.VarChar(50), Nombre)
      .input("Estado",sql.VarChar(20),Estado)
      .query(
        "EXEC SP_UpdateCategoria @IDCATEGORIA, @Nombre, @Estado" 
      );
  
      res.json({
        IDCATEGORIA,
        Nombre,
        Estado
      });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const DeleteCategoria = async(req, res) =>
    {
        try{
            const pool = await getConnection();
      
            const result = await pool
            .request()
            .input("IDCATEGORIA", req.params.IDCATEGORIA)
            .query("Exec SP_EliminarCategoria @IDCATEGORIA");
      
    
          return res.json({ message: "Categoria Eliminada" });
            
      
      
        }catch(error){
            res.status(500);
            res.send(error.message);
        }
    }