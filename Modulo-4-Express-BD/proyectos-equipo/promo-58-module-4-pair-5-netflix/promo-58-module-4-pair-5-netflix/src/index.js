// Importar la biblioteca de Express
const express = require("express");

// Importar la biblioteca de CORS
const cors = require("cors");

// Crear una variable con todo lo que puede hacer el servidor:
const server = express();

// Configuramos server para que funcione bien como API
server.use(cors());
server.use(express.json({ limit: "25Mb" }));

/*const fakeMovies = [
  {
    id: 1,
    title: "Wonder Woman",
    genre: "Action",
    image:
      "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/12/gal-gadot-como-wonder-woman-universo-extendido-dc-2895594.jpg?tf=3840x",
    category: "Superhero",
    year: 2017,
    director: "Patty Jenkins",
  },
  {
    id: 2,
    title: "Inception",
    genre: "Science Fiction",
    image:
      "https://m.media-amazon.com/images/S/pv-target-images/e826ebbcc692b4d19059d24125cf23699067ab621c979612fd0ca11ab42a65cb._SX1080_FMjpg_.jpg",
    category: "Thriller",
    year: 2010,
    director: "Christopher Nolan",
  },
];

// Endpoint obtener películas
server.get("/movies", (req, res) => {
  console.log("Se ha recibido una petición GET en /movies");

  //respuesta
  const response = {
    success: true,
    movies: fakeMovies,
  };

  //Envio
  res.json(response);
});
*/
// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// Instalar y configurar mysql usando "npm install mysql"
const mysql = require("mysql2/promise");
// Instalar y configurar dotenv usando "npm install dotenv"
require("dotenv").config();

// Configurar la conexión a la base de datos MySQL
const connection = async () => {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  return connection;
};
// Endpoint obtener películas desde la base de datos
server.get("/movies", async (req, res) => {
  console.log("Se ha recibido una petición GET en /movies");
  let dbConn = await connection();
  try {
    const [results] = await dbConn.execute("SELECT * FROM movies");
    const response = {
      success: true,
      movies: results,
    };
    res.json(response);
  } catch (error) {
    console.error("Error al obtener las películas:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
});
