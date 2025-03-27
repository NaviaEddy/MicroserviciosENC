const express = require("express");

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send(`
        <html>
        <head><title>Ejercicio1</title></head>
        <body>
            <h1>Calculadora</h1>
            <form method="POST" action="/calcular">
                <input type="number" name="a" placeholder="Ingrese A" required>
                <input type="number" name="b" placeholder="Ingrese B" required>
                <select name="operacion">
                    <option value="sumar">Sumar</option>
                    <option value="restar">Restar</option>
                    <option value="multiplicar">Multiplicar</option>
                    <option value="dividir">Dividir</option>
                </select>
                <button type="submit">Calcular</button>
            </form>
            <h2>Resultado: ${req.query.resultado}</h2>
        </body>
        </html>
    `);
});

// Ruta para procesar el cálculo
app.post("/calcular", (req, res) => {
    const { a, b, operacion } = req.body;
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    let resultado;

    if (isNaN(numA) || isNaN(numB)) {
        return res.redirect(`/?resultado=Ingrese números válidos`);
    }

    switch (operacion) {
        case "sumar":
            resultado = numA + numB;
            break;
        case "restar":
            resultado = numA - numB;
            break;
        case "multiplicar":
            resultado = numA * numB;
            break;
        case "dividir":
            if (numB === 0) {
                return res.redirect(`/?resultado=No se puede dividir por 0`);
            }
            resultado = numA / numB;
            break;
        default:
            return res.redirect(`/?resultado=Operación no válida`);
    }

    res.redirect(`/?resultado=${resultado}`);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
