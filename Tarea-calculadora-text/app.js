const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const calculator = require('./modules/calculator');
const textProcessor = require('./modules/textProcessor');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (req.method === 'GET') {
        if (pathname === '/' || pathname === '/calculadora.html') {
            // Servir el archivo HTML de la calculadora
            const filePath = path.join(__dirname, 'calculadora.html');
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error interno del servidor.');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        } else if (pathname === '/text_processor.html') {
            // Servir el archivo HTML del procesador de texto
            const filePath = path.join(__dirname, 'text_processor.html');
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error interno del servidor.');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        } else if (pathname === '/app.js') {
            // Servir el archivo app.js
            const filePath = path.join(__dirname, 'app.js');
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error interno del servidor.');
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.end(data);
                }
            });
        } else if (pathname === '/api/calculadora') {
            // Manejar una solicitud para la calculadora desde la URL
            const queryData = parsedUrl.query;
            const operacion = queryData.operacion;
            const num1 = parseFloat(queryData.num1);
            const num2 = parseFloat(queryData.num2);

            if (!isNaN(num1) && !isNaN(num2)) {
                let resultado;

                switch (operacion) {
                    case "sumar":
                        resultado = calculator.sumar(num1, num2);
                        break;
                    case "restar":
                        resultado = calculator.restar(num1, num2);
                        break;
                    case "multiplicar":
                        resultado = calculator.multiplicar(num1, num2);
                        break;
                    case "dividir":
                        resultado = calculator.dividir(num1, num2);
                        break;
                    default:
                        resultado = "Operación no válida";
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ resultado }));
            } else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Por favor, ingresa números válidos en ambos campos.');
            }

        } else if (pathname === '/api/texto') {
            // Manejar una solicitud para el procesador de texto desde la URL
            const queryData = parsedUrl.query;
            const funcion = queryData.funcion;
            const texto = decodeURIComponent(queryData.texto);

            let resultado;

            switch (funcion) {
                case "dividirPalabras":
                    resultado = textProcessor.dividirPalabras(texto);
                    break;
                case "eliminarEspacios":
                    resultado = textProcessor.eliminarEspacios(texto);
                    break;
                case "capitalizarTexto":
                    resultado = textProcessor.capitalizarTexto(texto);
                    break;
                case "textoEnMinusculas":
                    resultado = textProcessor.textoEnMinusculas(texto);
                    break;
                case "textoEnMayusculas":
                    resultado = textProcessor.textoEnMayusculas(texto);
                    break;
                case "contarCaracteres":
                    resultado = textProcessor.contarCaracteres(texto);
                    break;
                default:
                    resultado = "Función no válida";
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ resultadoTexto: resultado }));

        } else {
            // Manejar otras solicitudes (por ejemplo, archivos estáticos, imágenes, etc.)
            // Debes agregar más lógica para manejar otros tipos de archivos
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Página no encontrada.');
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Método HTTP no permitido.');
    }
});

const PORT = 4100;

server.listen(PORT, () => {
    console.log(`Servidor web escuchando en el puerto ${PORT}`);
});
