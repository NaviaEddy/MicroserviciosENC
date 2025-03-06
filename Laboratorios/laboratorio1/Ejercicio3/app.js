const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));  

app.set('view engine', 'ejs'); // Configurar EJS como motor de plantillas
app.use(express.static('public')); // Servir archivos estáticos

app.get('/', (req, res) => {
    res.sendFile('bienvenido.html', { root: __dirname + '/public' });
});
app.get('/listar', (req, res) => {
    db.query('SELECT * FROM agenda', (error, agendas) => {
        if (error) {
            console.log('Error al ejecutar la consulta');
            return;
        }
        res.render('listar', { agendas });
    });
});
// Mostrar formulario para agregar producto
app.get('/add', (req, res) => {
    res.render('add');
  });
 //Guardar el producto en la base de datos
app.post('/add', (req, res) => {
    const { nombre, apellido, direccion, telefono } = req.body;
    db.query('INSERT INTO agenda (nombres, apellidos, direccion, telefono) VALUES (?, ?, ?, ?)', [nombre, apellido, direccion, telefono], (error, resultado) => {
        if (error) {
            console.log('Error al insertar el producto');
            return;
        }
        res.redirect('/listar');
    }); 
});
// Mostrar formulario para editar producto
app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT id, nombres, apellidos, direccion, telefono FROM agenda WHERE id = ?', [id], (error, agendas) => {
        if (error) {
            console.log('Error al ejecutar la consulta');
            return;
        }
        res.render('edit', { agenda: agendas[0] });
    });
});

// Actualizar el producto en la base de datos
app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, direccion, telefono } = req.body;
    db.query('UPDATE agenda SET nombres = ?, apellidos = ?, direccion = ?, telefono = ? WHERE id = ?', [nombre, apellido, direccion, telefono, id], (error, resultado) => {
        if (error) {
            console.log('Error al actualizar el producto');
            return;
        }
        res.redirect('/listar');
    });
});

// Eliminar producto
app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM agenda WHERE id = ?', [id], (error, resultado) => {
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