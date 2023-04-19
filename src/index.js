const express = require("express");
const connectDB = require("./config/db");

const dotenv = require("dotenv");
dotenv.config();

connectDB();
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json()); // to accept json data

app.get("/", (req, res) => {
    res.send("API Running!");
});

const PORT = process.env.PORT


app.listen(PORT, () => {
    console.log(`express is running on port ${PORT}`)
})


