const uuid = require("uuid");

class Player {
  constructor(id, symbol, name) {
    this.id = id;
    this.symbol = symbol;
    this.name = name;
  }

  getDetails() {
    return {
      id: this.id,
      symbol: this.symbol,
      name: this.name,
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

  s() {
    return this.player ? this.player.symbol : null;
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
    this.moves = 0;

    // 0 Not ready // 1 Ready // 2 Started // 3 finished
    this.state = 0;
    this.result = {
      tie: false,
      winner: null,
    };
  }

  resetGame() {
    this.board = [];

    for (let i = 0; i < 3; i++) {
      this.board.push([]);

      for (let j = 0; j < 3; j++) {
        this.board[i].push(new Cell());
      }
    }

    this.state = 1;
    this.moves = 0;
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

  checkFinished() {
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0].s() &&
        this.board[i][1].s() &&
        this.board[i][2].s() &&
        this.board[i][0].s() == this.board[i][1].s() &&
        this.board[i][0].s() == this.board[i][2].s()
      ) {
        return true;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        this.board[0][i].s() &&
        this.board[1][i].s() &&
        this.board[2][i].s() &&
        this.board[0][i].s() == this.board[1][i].s() &&
        this.board[0][i].s() == this.board[2][i].s()
      ) {
        return true;
      }
    }

    if (
      this.board[0][0].s() &&
      this.board[1][1].s() &&
      this.board[2][2].s() &&
      this.board[0][0].s() == this.board[1][1].s() &&
      this.board[0][0].s() == this.board[2][2].s()
    ) {
      return true;
    }

    if (
      this.board[0][2].s() &&
      this.board[1][1].s() &&
      this.board[2][0].s() &&
      this.board[0][2].s() == this.board[1][1].s() &&
      this.board[0][2].s() == this.board[2][0].s()
    ) {
      return true;
    }

    return false;
  }

  playMove(r, c) {
    let player = this.players[this.move];

    if (!this.board[r][c].isOccupied()) {
      this.moves += 1;

      this.board[r][c].setPlayer(player);

      if (this.checkFinished()) {
        this.state = 3;
        this.result = {
          tie: false,
          winner: this.players[this.move],
        };
      } else {
        if (this.moves == 9) {
          this.state = 3;
          this.result = {
            tie: true,
            winner: null,
          };
        }
      }

      this.toggleMove();

      return true;
    }
  }

  getGameState() {
    return {
      id: this.id,
      move: this.move,
      board: this.getBoardState(),
      players: this.getPlayers(),
      state: this.state,
      result: this.result,
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
