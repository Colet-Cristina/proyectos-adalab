// -------------------  SECCION DE IMPORTS  ------------------
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();
const path = require("node:path");

// ----------  SECCION DE CONFIGURACIÓN DE EXPRESS  ----------
const app = express();

app.use(cors());
app.use(express.json({ limit: "25Mb" }));

// Configuramos Express para que funcione como servidor de ficheros dinámicos (Punto 2 de EJS)
app.set("view engine", "ejs");

// -----------  SECCION DE CONFIGURACIÓN DE MYSQL  -----------
const getConnection = async () => {
  const datosConexion = {
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "pass",
    database: process.env.MYSQL_SCHEMA || "api_aves",
  };

  const conn = await mysql.createConnection(datosConexion);
  await conn.connect();
  return conn;
};

// --------------------  INICIAMOS EXPRESS  ------------------
const port = 3000;
app.listen(port, () => {
  console.log(`Uh! El servidor ya está arrancado: http://localhost:${port}/`);
});

// ------------------  SECCIÓN DE ENDPOINTS  -----------------

// ------ Endpoint para listar aves (GET /api/aves) ------
app.get("/api/aves", async (req, res) => {
  // 1. Nos conectamos con la bd
  const conn = await getConnection();

  // 2. Preparamos una query (con el JOIN para la categoría)
  const querySelectAves = `
    SELECT aves.*, categoria.tipo 
    FROM aves 
    LEFT JOIN categoria ON aves.categoria_id = categoria.id`;

  // 3. Lanzamos la query y obtenemos los resultados
  const [resultados] = await conn.query(querySelectAves);

  // 4. Cerramos la conexión.
  await conn.end();

  // 5. Responder con los datos
  res.json(resultados);
});

// ----- Endpoint para crear un ave (POST /api/aves) -----
app.post("/api/aves", async (req, res) => {
  // 1. Conectarse
  const conn = await getConnection();

  // 2. Preparar sentencia
  const queryInsert = `
    INSERT INTO aves (nombre_comun, nombre_cientifico, envergadura_cm, descripcion, imagen, categoria_id)
    VALUES (?, ?, ?, ?, ?, ?)`;

  // 3. Lanzar sentencia
  const [result] = await conn.execute(queryInsert, [
    req.body.nombre_comun,
    req.body.nombre_cientifico,
    req.body.envergadura_cm,
    req.body.descripcion,
    req.body.imagen,
    req.body.categoria_id,
  ]);

  // 4. Cerrar
  await conn.end();

  // 5. Devolver información
  res.json({
    success: true,
    id: result.insertId,
  });
});

// ----- Endpoint para obtener el detalle de UN ave (GET /api/aves/:id) -----
app.get("/api/aves/:id", async (req, res) => {
  console.log(`Petición GET /api/aves/${req.params.id}`);

  // Comprobación de seguridad: ¿Es el ID un número?
  if (isNaN(parseInt(req.params.id))) {
    return res.status(400).json({
      success: false,
      error: "No es un ID válido",
    });
  }

  // 1. Conectarse a la base de datos
  const conn = await getConnection();

  // 2. Preparar sentencia SQL con filtro WHERE para buscar por ID
  const selectOneAve = `
    SELECT aves.*, categoria.tipo AS nombre_categoria
    FROM aves
    LEFT JOIN categoria ON aves.categoria_id = categoria.id
    WHERE aves.id = ?;
  `;

  // 3. Lanzar la sentencia SQL pasando el ID de la ruta
  const [results] = await conn.query(selectOneAve, [req.params.id]);

  // 4. Cerrar la conexión
  await conn.end();

  // 5. Devolver la información
  if (results.length === 0) {
    // Si no hay resultados, enviamos un 404 personalizado
    return res.status(404).json({
      success: false,
      error: "Ave no encontrada",
    });
  }

  // Si existe, devolvemos el objeto (el primer y único elemento del array)
  res.json({
    success: true,
    data: results[0],
  });
});

// ----- Endpoint para borrar un ave (DELETE /api/aves/:id) -----
app.delete("/api/aves/:id", async (req, res) => {
  console.log(`Petición DELETE /api/aves/${req.params.id}`);

  // 1. Conectarse a la base de datos
  const conn = await getConnection();

  // 2. Preparar sentencia SQL (DELETE con WHERE)
  const queryDelete = "DELETE FROM aves WHERE id = ?";

  try {
    // 3. Lanzar la sentencia SQL
    const [result] = await conn.execute(queryDelete, [req.params.id]);

    // 4. Cerrar la conexión
    await conn.end();

    // 5. Devolver la información
    // Comprobamos si se ha borrado algo (affectedRows > 0)
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "No se encontró el ave para borrar",
      });
    }

    res.json({
      success: true,
      message: "Ave eliminada correctamente",
    });
  } catch (error) {
    if (conn) await conn.end();
    res.status(500).json({
      success: false,
      error: "Error al intentar borrar en la base de datos",
    });
  }
});

// -------------  SERVIDOR DE ESTÁTICOS  ------------
app.use(express.static(path.join(__dirname, "..", "FRONTEND", "dist")));

// Endpoint de "Error no encontrado" (Último de la sección Endpoints)
app.get(/.*/, (req, res) => {
  res.status(404).send("Página no encontrada.");
});
