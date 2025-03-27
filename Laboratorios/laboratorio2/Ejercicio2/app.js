require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 8080;
app.use(bodyParser.urlencoded({ extended: true }));  

app.set('view engine', 'ejs'); // Configurar EJS como motor de plantillas
app.use(express.static('public')); // Servir archivos estáticos


app.get('/', (req, res) => {
    res.sendFile('bienvenido.html', { root: __dirname + '/public' });
});
app.get('/listar', (req, res) => {
    db.query('SELECT * FROM users', (error, users) => {
        if (error) {
            console.log('Error al ejecutar la consulta');
            return;
        }
        res.render('listar', { users });
    });
});
// Mostrar formulario para agregar producto
app.get('/add', (req, res) => {
    res.render('add');
  });
 //Guardar el producto en la base de datos
app.post('/add', (req, res) => {
    const { nombre, email, fecha } = req.body;
    db.query('INSERT INTO users (nombre, correo_electronico, fecha_registro) VALUES (?, ?, ?)', [nombre, email, fecha], (error, resultado) => {
        if (error) {
            console.log('Error al insertar el producto');
            return;
        }
        res.redirect('/listar');
    }); 
});

// Eliminar producto
app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [id], (error, resultado) => {
        if (error) {
            console.log('Error al eliminar el producto');
            return;
        }
        res.redirect('/listar');
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});