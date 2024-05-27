const express = require ('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config.js');

// Crear servidor de express
const app = express();

//Configurar cors
app.use(cors());

//Base de datos
dbConnection();


//Rutas
app.get( '/', (req, res) => {
    res.status(400).json({
        ok: true,
        msg: "Hola"
    })
} );

app.listen( process.env.PORT, () => {
    console.log("Servidor corriendo en puerto " + process.env.PORT);
} );