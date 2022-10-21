const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./router');

require('dotenv').config({path: 'variables.env'});



const app = express();

// Body parser para leer los datos del formulario
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar Mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
})

// Habilitar pug
app.set('view engine', 'pug');

// Carpeta para las vistas
app.set('views', path.join(__dirname, './views'));

// Cargar los archivos estaticos en public
app.use(express.static('public'));

// Definir rutas de la aplicación
app.use('/', routes());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log("el servidor esta funcionando");
});