require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 80;

// Dados de conexão com o RDS
const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: 3306,
        database: process.env.DB_NAME
});

// Testa a conexão ao iniciar
db.connect(err => {
    if (err) {
        console.error('Erro na conexão com o banco:', err.message);
        process.exit(1); // encerra o app
    }
    console.log('Conectado ao banco de dados!');
});

// Rota padrão
app.get('/', (req, res) => {
    res.send('API rodando! Vá para /empregados');
});

// Rota para buscar empregados (para teste)
app.get('/empregados', (req, res) => {
    const sql = 'SELECT * FROM Empregado';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err.message);
            res.status(500).send('Erro ao consultar banco');
            return;
        }
        res.json(results);
    });
});

// Iniciar servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});