const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const amqp = require('amqplib');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Post the login
app.post('/login', async (req, res) => {
  const { username, email, password } = req.body;
  const login = { username, email, password };

  // send message to RabbitMQ queue
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queueName = 'loginQueue';
  await channel.assertQueue(queueName);
  await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(login)));
  await channel.close();
  await connection.close();

  res.status(201).send(login);
});

// consume messages from RabbitMQ queue and insert into database
async function consumeMessages() {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "UJ10000",
    database: "cormenai",
    port: 5432
  });
  await client.connect();

  const queueName = 'loginQueue';
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName);
  await channel.consume(queueName, async (message) => {
    const login = JSON.parse(message.content.toString());
    await client.query(`INSERT INTO login (username, email, password) VALUES ('${login.username}', '${login.email}', '${login.password}')`);
    console.log(`Login inserted: ${JSON.stringify(login)}`);
    channel.ack(message);
  });

  console.log('Waiting for messages...');
}

consumeMessages().catch(console.error);

// Verify the login
app.post('/login/verify', async (req, res) => {
  const { username, password } = req.body;

  // send message to RabbitMQ queue
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queueName = 'loginVerifyQueue';
  await channel.assertQueue(queueName);
  await channel.sendToQueue(queueName, Buffer.from(JSON.stringify({ username, password })));
  await channel.close();
  await connection.close();

  res.sendStatus(200);
});

// consume messages from RabbitMQ queue and verify the login
async function consumeMessagesVerify() {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "UJ10000",
    database: "cormenai",
    port: 5432
  });
  await client.connect();

  const queueName = 'loginVerifyQueue';
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName);
  await channel.consume(queueName, async (message) => {
    const login = JSON.parse(message.content.toString());
    const result = await client.query(`SELECT * FROM login WHERE username = '${login.username}' AND password = '${login.password}'`);
    if (result.rows.length > 0) {
      console.log(`Login verified: ${JSON.stringify(login)}`);
    } else {  
      console.log(`Login not verified: ${JSON.stringify(login)}`);
    }
    channel.ack(message);
  });

  console.log('Waiting for messages...');
}

consumeMessagesVerify().catch(console.error);


app.listen(port, () => {
  console.log(`Microservice listening at http://localhost:${port}`);
});