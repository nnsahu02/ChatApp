const express = require("express");
const connectDB = require("./config/db");
const router = require('./router/routes')

const dotenv = require("dotenv");
dotenv.config();

connectDB();
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.json()); // to accept json data

app.get("/", (req, res) => {
    res.send("API Running!");
});

const PORT = process.env.PORT;

app.use('/',router)


//SOCKETIO STUFF

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});

server.listen(PORT, () => {
    console.log(`express is running on port ${PORT}`);
});
