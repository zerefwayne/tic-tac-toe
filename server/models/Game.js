const uuid = require("uuid");

class Player {
  constructor(id, symbol) {
    this.id = id;
    this.symbol = symbol;
  }

  getDetails() {
    return {
      id: this.id,
      symbol: this.symbol,
    };
  }
}

class Cell {
  constructor() {
    this.player = null;
  }

  isOccupied() {
    return this.content != null;
  }

  setPlayer(player) {
    this.player = player;
  }

  getPlayer() {
    return this.player;
  }
}

class Game {
  constructor() {
    this.id = uuid.v4().toString().slice(0, 8);

    this.board = [];

    for (let i = 0; i < 3; i++) {
      this.board.push([]);

      for (let j = 0; j < 3; j++) {
        this.board[i].push(new Cell());
      }
    }

    this.players = [];

    this.move = 0;

    // 0 Not ready // 1 Ready // 2 Started
    this.state = 0;
  }

  resetGame() {
    var [r, c] = [3, 3];

    this.board = [];

    for (let i = 0; i < 3; i++) {
      this.board.push([]);

      for (let j = 0; j < 3; j++) {
        this.board[i].push(new Cell());
      }
    }

    this.move = 0;

    this.state = 1;
  }

  startGame() {
    this.state = 2;
    this.move = 0;
  }

  toggleMove() {
    this.move = 1 - this.move;
  }

  setPlayer1(player) {
    this.players.push(player);
    console.log("player1 set", this.id, player.id);
  }

  setPlayer2(player) {
    this.players.push(player);
    this.state = 1;
    console.log("player2 set", this.id, player.id);
  }

  playMove(r, c) {
    let player = this.players[this.move];

    if (!this.board[r][c].isOccupied()) {
      this.board[r][c].setPlayer(player);
      this.toggleMove();
      return true;
    }

    return false;
  }

  getGameState() {
    return {
      id: this.id,
      move: this.move,
      board: this.getBoardState(),
      players: this.getPlayers(),
      state: this.state,
    };
  }

  getBoardState() {
    return this.board.filter((row) => {
      return row.filter((cell) => {
        return cell.getPlayer() ? cell.getPlayer().getDetails() : null;
      });
    });
  }

  getPlayers() {
    let player1 = this.players.length > 0 ? this.players[0].getDetails() : null;
    let player2 = this.players.length > 1 ? this.players[1].getDetails() : null;

    return {
      player1,
      player2,
    };
  }
}

module.exports = {
  Player,
  Cell,
  Game,
};
