const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config')


// Con esto configuramos para tomar nuestras variables de entorno
require('dotenv').config();



//* Crear el servidor de express
const app = express();


//* Base de datos
dbConnection();


//* Cors
app.use(cors());



//* Directorio publico
app.use( express.static('public'));

// * Lectura y parseo del body
app.use( express.json() );




//* Rutas
// TODO: auth // crear, login, renew
app.use('/api/auth', require('./routes/auth'));


// TODO: CRUD: Eventos
app.use('/api/events', require('./routes/events'));








//* Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
});
