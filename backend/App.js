require('dotenv').config();
const database = require("./config/Database");
const cors = require("cors");
const express = require("express");
const route = require("./routes/Routes");
const cookieParser = require("cookie-parser");

database.connect();
const app = express();

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());
app.use(cookieParser())

route(app)

module.exports = app;
