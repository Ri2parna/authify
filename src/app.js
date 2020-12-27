// imports
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// database connection
const dbURI =
  'mongodb+srv://authify-express-backend:iv8j9knyesvDLf13@notedlycluster.flnto.mongodb.net/authify?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => app.listen(PORT))
  .catch((error) => console.error(error));

// routes
app.use('/v1', authRoutes);
module.exports = app;
