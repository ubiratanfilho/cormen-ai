const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const amqp = require('amqplib');

const app = express();
const port = 4000;

app.use(bodyParser.json());

// Post the article
app.post('/articles', async (req, res) => {
  const { title, content, thumbnail } = req.body;
  const article = { title, content, thumbnail };

  // send message to RabbitMQ queue
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queueName = 'articleQueue';
  await channel.assertQueue(queueName);
  await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(article)));
  await channel.close();
  await connection.close();

  res.status(201).send(article);
});

// consume messages from RabbitMQ queue and insert into database
async function consumeMessages() {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "CormenA!**",
    database: "cormenai",
    port: 5432
  });
  await client.connect();

  const queueName = 'articleQueue';
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName);
  await channel.consume(queueName, async (message) => {
    const article = JSON.parse(message.content.toString());
    await client.query(`INSERT INTO noticias (title, content, thumbnail) VALUES ('${article.title}', '${article.content}', '${article.thumbnail}')`);
    console.log(`Article inserted: ${JSON.stringify(article)}`);
    channel.ack(message);
  });

  console.log('Waiting for messages...');
}

consumeMessages().catch(console.error);

// update the article
app.put('/articles/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, thumbnail } = req.body;

  // send message to RabbitMQ queue
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queueName = 'articleUpdateQueue';
  await channel.assertQueue(queueName);
  await channel.sendToQueue(queueName, Buffer.from(JSON.stringify({ id, title, content, thumbnail })));
  await channel.close();
  await connection.close();

  res.sendStatus(204);
});

// consume messages from RabbitMQ queue and update the article in the database
async function consumeArticleUpdateMessages() {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "CormenA!**",
    database: "cormenai",
    port: 5432
  });
  await client.connect();

  const queueName = 'articleUpdateQueue';
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName);
  await channel.consume(queueName, async (message) => {
    const { id, title, content, thumbnail } = JSON.parse(message.content.toString());
    await client.query(`UPDATE noticias SET title = '${title}', content = '${content}', thumbnail = '${thumbnail}' WHERE id = ${id}`);
    console.log(`Article updated: ${JSON.stringify({ id, title, content, thumbnail })}`);
    channel.ack(message);
  });

  console.log('Waiting for article update messages...');
}

consumeArticleUpdateMessages().catch(console.error);

app.get('/articles', async (req, res) => {
  // send message to RabbitMQ queue
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queueName = 'articleGetQueue';
  await channel.assertQueue(queueName);
  // send id to queue
  await channel.sendToQueue(queueName, Buffer.from(JSON.stringify('1')));
  await channel.close();
  await connection.close();

  const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "CormenA!**",
    database: "cormenai",
    port: 5432
  });
  await client.connect();

  const rows = [];

  const result = await client.query('SELECT * FROM noticias');
  // create a loop to store all rows
  for (let row of result.rows) {
    rows.push(row);
  }

  res.status(200).json(rows);
});

// consume messages from RabbitMQ queue and get the article in the database
async function consumeArticleGetMessages() {
  const queueName = 'articleGetQueue';
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName);

  await channel.consume(queueName, async (message) => {
    const { id } = JSON.parse(message.content.toString());
    const client = new Client({
      host: "localhost",
      user: "postgres",
      password: "CormenA!**",
      database: "cormenai",
      port: 5432
    });
    await client.connect();
    const result = await client.query('SELECT * FROM noticias');
    const article = result.rows[0];
    channel.ack(message);
  });

  console.log('Waiting for article get messages...');
}

consumeArticleGetMessages();

consumeArticleGetMessages().catch(console.error);

app.listen(port, () => {
  console.log('Microservice listening on port ' + port);
});