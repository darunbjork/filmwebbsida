const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');


dotenv.config({ path: './.env'});

const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json());

app.use(morgan('tiny'));


app.use('/api/movies', require('./routes/movies'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} made on port ${PORT}`)
);