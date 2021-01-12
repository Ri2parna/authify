// imports
import { connectionString } from './settings';

const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(cookieParser());

// view engine
// database connection
const dbURI = process.env.CONNECTION_STRING;
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.error(error));

// routes
app.use('/v1', authRoutes);
module.exports = app;
