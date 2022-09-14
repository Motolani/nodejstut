const Joi = require('joi');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

app.use(express.json());

//router course routes
app.use('/api/vidly/genres', genres);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`))
