const express = require("express");
const uuid = require("uuid");
const app = express();
const http = require("http").Server(app);

let PORT = 5000;

http.listen(PORT, function () {
  console.log(`Tic-tac-toe game server running on port: ${PORT}`);
});

const io = require("socket.io")(http);

io.on("connection", (socket) => {
    console.log("new connection", socket.id);

    socket.on("disconnect", () => {
        console.log("disconnected", socket.id);
    })

})