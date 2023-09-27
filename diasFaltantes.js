const http = require('http');
const url = require('url');
const diasFaltantesModule = require('./diasFaltantesModulo');

const PORT = 2100;

http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    const queryDate = parsedUrl.query.date;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    if (queryDate) {
        const diasFaltantes = diasFaltantesModule.calcularDiasFaltantes(queryDate);
        res.write(`
            <html>
            <head>
                <title>Calculadora de Días Faltantes</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        text-align: center;
                    }
                    h1 {
                        color: #333;
                    }
                </style>
            </head>
            <body>
                <h1>Calculadora de Días Faltantes</h1>
                <p>Días faltantes hasta ${queryDate}: ${diasFaltantes} días</p>
            </body>
            </html>
        `);
    } else {
        res.write(`
            <html>
            <head>
                <title>Calculadora de Días Faltantes</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        text-align: center;
                    }
                    h1 {
                        color: #333;
                    }
                    p {
                        color: red;
                    }
                </style>
            </head>
            <body>
                <h1>Calculadora de Días Faltantes</h1>
                <p>Por favor, ingresa una fecha válida en la URL.</p>
            </body>
            </html>
        `);
    }

    res.end();
}).listen(PORT);

console.log(`Servidor en ejecución en http://localhost:${PORT}/`);
