const express = require('express');
const Joi = ('joi');
const app = express();
const genres = require('./routes/genres');
const home = require('./routes/home');

app.use(express.json());

app.use('/api/genres', genres);
app.use('/', home);


const port = process.env.PORT || 3000
app.listen(port);
console.log('3000');