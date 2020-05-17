const express = require("express");
const uuid = require("uuid");
const app = express();
const http = require("http").Server(app);

const User = require("./models/User");
const { Game, Player } = require("./models/Game");

let PORT = process.env.PORT || 5000;

http.listen(PORT, function () {
  console.log(`Tic-tac-toe game server running on port: ${PORT}`);
});

const io = require("socket.io")(http);

let users = {};
let games = {};

const getUsers = () => {
  let currentUsers = [];

  Object.values(users).forEach((user) => {
    currentUsers.push(user.getDetails());
  });

  return currentUsers;
};

const initUser = (socket, initData) => {
  let user = new User(socket, initData.name);

  users[socket.id] = user;

  const initPayload = {
    user: user.getDetails(),
    users: getUsers(),
  };

  const informPayload = {
    user: user.getDetails(),
  };

  console.log(initPayload);

  socket.emit("INIT", initPayload);

  socket.broadcast.emit("JOIN_USER", informPayload);
};

const detachUser = (socket) => {
  let user = users[socket.id];

  let rooms = socket.rooms;

  console.log(rooms);

  Object.keys(rooms).forEach((game) => {
    delete games[game];
    io.sockets.in(game).emit("LEAVE_GAME");
  });

  const payload = {
    user: user.getDetails(),
  };

  socket.broadcast.emit("LEAVE_USER", payload);

  delete users[socket.id];
};

io.on("connection", (socket) => {
  console.log("connected", socket.id);

  socket.on("INIT_USER", (initData) => {
    initUser(socket, initData);
  });

  socket.on("NEW_GAME", () => {
    let game = new Game();
    let user = users[socket.id];

    let player = new Player(socket.id, "X", user.name);

    game.setPlayer1(player);

    const payload = {
      game: game.getGameState(),
    };

    games[game.id] = game;

    socket.join(game.id);

    socket.emit("ENTER_GAME", payload);
  });

  socket.on("JOIN_GAME", (gameId) => {
    if (games[gameId] != null) {
      let user = users[socket.id];

      let game = games[gameId];

      let player = new Player(socket.id, "O", user.name);

      games[gameId].setPlayer2(player);

      const payload = {
        game: game.getGameState(),
      };

      socket.join(game.id);

      socket.emit("ENTER_GAME", payload);
      socket.to(gameId).emit("UPDATE_GAME", payload);
    }
  });

  socket.on("LEAVE_GAME", (gameId) => {
    socket.emit("LEAVE_GAME");

    delete games[gameId];

    io.sockets.in(gameId).emit("LEAVE_GAME");
  });

  socket.on("START_GAME", (gameId) => {
    if (games[gameId] != null) {
      games[gameId].startGame();

      const payload = {
        game: games[gameId].getGameState(),
      };

      io.sockets.in(gameId).emit("UPDATE_GAME", payload);
    }
  });

  socket.on("MOVE_GAME", (data) => {
    let gameId = data.game;
    let r = data.move.r;
    let c = data.move.c;

    if (games[gameId] != null) {
      games[gameId].playMove(r, c);

      const payload = {
        game: games[gameId].getGameState(),
      };

      io.sockets.in(gameId).emit("UPDATE_GAME", payload);
    }
  });

  socket.on("RESET_GAME", (gameId) => {
    if (games[gameId] != null) {
      games[gameId].resetGame();

      const payload = {
        game: games[gameId].getGameState(),
      };

      io.sockets.in(gameId).emit("UPDATE_GAME", payload);
    }
  });

  socket.on("disconnecting", function () {
    if (users[socket.id] != null) {
      detachUser(socket);
    }
  });

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
  });
});
