require('dotenv').config();
const database = require("./config/Database");
const cors = require("cors")
const express = require("express")

database.connect()

const app = express()

app.use(cors({origin: 'http://localhost:3000', credentials: true}));

app.get("/test", (req, res) => {
    res.send("Hello there, you have sent a request here. Nice Job!")
})

module.exports = app;
