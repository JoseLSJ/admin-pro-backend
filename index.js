const express = require ('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config.js');

// Crear servidor de express
const app = express();

//Configurar cors
app.use(cors());

//Lectura y parseo del body
app.use( express.json() );

//Base de datos
dbConnection();


//Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );

// app.get( '/api/usuarios', (req, res) => {
//     res.json({
//         ok: true,
//         usuarios: [{
//             id: 123,
//             nombre: "Jose"
//         }]
//     })
// });

app.listen( process.env.PORT, () => {
    console.log("Servidor corriendo en puerto " + process.env.PORT);
} );