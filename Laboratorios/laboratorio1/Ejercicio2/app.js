const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/generar', (req, res) => {
    const operacion = req.body.operacion;
    const numero = parseInt(req.body.numero);
    const inicio = parseInt(req.body.inicio);
    const fin = parseInt(req.body.fin);

    let tabla = [];

    for (let i = inicio; i <= fin; i++) {
        let resultado;
        let simbolo;

        switch (operacion) {
            case 'suma':
                resultado = numero + i;
                simbolo = '+';
                break;
            case 'resta':
                resultado = numero - i;
                simbolo = '-';
                break;
            case 'multiplicacion':
                resultado = numero * i;
                simbolo = 'x';
                break;
            case 'division':
                if (i === 0) {
                    resultado = 'Error (división por 0)';
                } else {
                    resultado = (numero / i).toFixed(2);
                }
                simbolo = '÷';
                break;
            default:
                resultado = 'Operación no válida';
        }

        tabla.push({ numero, i, simbolo, resultado });
    }

    res.render('resultado', { operacion, tabla });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
