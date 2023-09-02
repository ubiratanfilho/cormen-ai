// microsserviço de login
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors');

const app = express();

const port = 3002;

app.use(bodyParser.json());
app.use(cors());

// Configuração do banco de dados
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'cormenai',
    password: 'CormenA!**',
    port: 5432,
});

client.connect();

// Rota para inserir usuários
app.post('/login', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (username === "" || email === "" || password === "") {
            res.status(201).send('Preencha todos os campos!');
        }
        else {
            const result = await client.query(
                'INSERT INTO login (username, email, password) VALUES ($1, $2, $3)',
                [username, email, password]
            );

            res.status(201).send('Usuário inserido com sucesso!');
        }

        res.status(201).send('Usuário inserido com sucesso!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao inserir usuário!');
    }
});

// Rota para exibir usuários
app.get('/login', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM login');

        res.status(200).send(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar usuários!');
    }
});

// rota para checar se o login está correto
app.post('/login/check', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await client.query(
            'SELECT * FROM login WHERE username = $1 AND password = $2',
            [username, password]
        );

        if (result.rows.length === 0) {
            res.status(201).send('Usuário ou senha incorretos!');
        } else {
            res.status(200).send('Login realizado com sucesso!');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar usuários!');
    }
});

app.listen(port, () => {
    console.log(`Microsserviço de login rodando na porta ${port}`);
});