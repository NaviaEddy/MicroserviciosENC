require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const tareasRouter = require('./routes/tareaRoute');

const app = express();
const port = 8080;

connectDB();

app.use(express.json());
app.use('/tareas', tareasRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});


