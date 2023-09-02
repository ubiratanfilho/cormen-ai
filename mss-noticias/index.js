// microsserviço de notícias
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

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

// Rota para inserir notícias
app.post('/noticias', async (req, res) => {
    const { title, content, thumbnail } = req.body;

    try {
        const result = await client.query(
            'INSERT INTO noticias (title, content, thumbnail) VALUES ($1, $2, $3)',
            [title, content, thumbnail]
        );

        res.status(201).send('Notícia inserida com sucesso!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao inserir notícia!');
    }
});

// Rota para exibir notícias
app.get('/noticias', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM noticias');

        res.status(200).send(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar notícias!');
    }
});

app.listen(port, () => {
    console.log(`Microsserviço de notícias rodando na porta ${port}`);
});