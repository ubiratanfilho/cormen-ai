const axios = require('axios');

const response = axios.get('http://localhost:3001/noticias');
const noticias = [response.data];

console.log(noticias);