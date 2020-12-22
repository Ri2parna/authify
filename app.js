// imports
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const app = express();
const PORT = process.env.PORT || 3000

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://authify-express-backend:iv8j9knyesvDLf13@notedlycluster.flnto.mongodb.net/authify?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

// routes
app.use(authRoutes);
