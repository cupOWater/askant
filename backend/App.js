require('dotenv').config();
const database = require("./config/Database");
const cors = require("cors");
const express = require("express");
const route = require("./routes/Routes");
const cookieParser = require("cookie-parser");
const path = require("path");

database.connect();
const app = express();

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

route(app)
module.exports = app
