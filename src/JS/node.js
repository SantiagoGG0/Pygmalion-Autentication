//Constantes para la importación de las tecnologías para el back-end.
const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const path = require('path');


const app = express();
const port = 8000;


//Creando conexión a mongoDB.

const mongoURL = 'mongodb://localhost:27017/Pygmalion';
const pygDB = 'Pygmalion';

//Middleware para las solicitudes.

app.use(bodyParser.urlencoded({extended: true}));

//Usando archivos estáticos HTML, CSS y JS

app.use(express.static(path.join(__dirname, 'src')));

//Conexión con HTML.

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'html', 'index.html'));
});

// Procesando el registro de usuario.
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'html', 'register.html'));
});


//Método post para manejar los datos de Inicio de Sesión.

app.post('/inicioSesión',(req, res) => {
    const username = req.body.username;
    const password = req.body.password;


    //Conectando la base de datos con MongoDB.

    MongoClient.connect(mongoURL,{useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
        if(err) throw err;

        const database = cliente.db(pygDB);
        const collection = database.collection('usuarios');

        //Consulta a MongoDB para validar nombre de usuario y contraseña.

        collection.findOne({nombre_usuario: username, contraseña: password}, (error, user) => {
            if (error) throw error;

            if(user){
                res.send(`Inicio de sesión exitoso. Bienvenido, ${user.nombre_usuario}!`);
            }else{
                res.send('Inicio de sesión fallido. Verifica tu nombre de usuario y contraseña.')
            }

            //Se cierra la conexión a la base de datos.
            client.close();
        });
    });
});


app.post('/index', (req, res) => {
    const username = req.body.username
    const password = req.body.password;

    MongoClient.connect(mongoURL,{useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
        if(err) throw err;

        const database = cliente.db(pygDB);
        const collection = database.collection('usuarios');

        collection.insertOne({nombre_usuario: username, contraseña: password}, (error, result) => {
            if (error) throw error;
            res.send('Registro exitoso. Ahora puedes Iniciar Sesión');
            client.close();
        });
    });
});



app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`)
});
