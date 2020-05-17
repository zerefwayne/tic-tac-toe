<template>
  <div class="app-game">
    <div class="game-header" :style="`height: ${titleHeight}px;`">
      <div class="player player1">
        <img src="@/assets/x-white.png" />
        <span
          class="player-name ml-3"
          v-if="game.players.player1 != null"
        >{{ game.players.player1.name }}</span>
      </div>
      <div class="game-state">
        <p class="mb-2">{{getStatus()}}</p>
        <button class="btn btn-success" v-if="game.state == 1" @click="startGame">Start Game</button>
        <button @click="resetGame" v-if="game.state == 3" class="btn btn-success">Play Again?</button>
      </div>
      <div class="player player2">
        <img src="@/assets/o-white.png" />
        <span
          class="player-name mr-3"
          v-if="game.players.player2 != null"
        >{{ game.players.player2.name }}</span>
        <span class="player-name mr-3" v-else>Awaiting Player</span>
      </div>
    </div>
    <div class="game-window">
      <!-- <template v-if="game.state >= 2"> -->
      <div class="mt-5">
        <table class="grid">
          <tr v-for="r in [0, 1, 2]" :key="r">
            <td v-for="c in [0, 1, 2]" :key="`${r}${c}`" @click="() => {playMove(r, c)}">
              <img :src="computeSymbol(game.board[r][c].player)" />
            </td>
          </tr>
        </table>
      </div>
      <!-- </template> -->
    </div>
    <div class="game-footer">
      <span class="mr-3" v-clipboard:copy="game.id" style="cursor: pointer;">Game ID: {{ game.id }}</span>

      <form @submit.prevent="leaveGame">
        <button class="btn btn-outline-danger mb-0" type="submit">Leave Game</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "app-game",
  computed: mapState({
    user: state => state.user,
    game: state => state.game,
    titleHeight: state => state.titleHeight
  }),
  methods: {
    leaveGame() {
      this.$socket.emit("LEAVE_GAME", this.game.id);
    },
    startGame() {
      this.$socket.emit("START_GAME", this.game.id);
    },
    computeSymbol(player) {
      if (player == null) {
        return "";
      } else if (player.symbol == "X") {
        return require("../assets/x-game.png");
      } else {
        return require("../assets/o-game.png");
      }
    },
    getStatus() {
      let status = "";

      switch (this.game.state) {
        case 0:
          status = "";
          break;
        case 1:
          status = "Ready";
          break;
        case 2:
          status = this.getMove();
          break;
        case 3:
          status = this.game.result.tie
            ? "It's a tie!"
            : `${this.game.result.winner.name} won!`;
          break;
      }

      return status;
    },

    getMove() {
      if (this.game.move == 0) {
        this.isMyMove = this.game.players.player1.id === this.user.id;
      } else {
        this.isMyMove = this.game.players.player2.id === this.user.id;
      }

      if (this.isMyMove) {
        return "Your move!";
      } else {
        return `Awaiting turn`;
      }
    },
    playMove(r, c) {
      if (this.game.state != 2 || this.game.board[r][c].player != null) {
        return;
      }

      if (this.isMyMove) {
        const payload = {
          game: this.game.id,
          move: { r, c }
        };

        this.$socket.emit("MOVE_GAME", payload);
      }
    },
    resetGame() {
      this.$socket.emit("RESET_GAME", this.game.id);
    }
  }
};
</script>

<style lang="scss">
.grid {
  td {
    width: 150px;
    height: 150px;
    text-align: center;
    cursor: pointer;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    border: 4px solid #0052cc;
  }
  border-collapse: collapse;
  border-style: hidden;
}

.app-game {
  height: 100%;
  display: flex;
  flex-direction: column;
  .game-header {
    background-color: #222222;

    display: flex;
    color: white;

    align-items: stretch;

    .game-state {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
    }

    .player {
      flex: 1;
      padding: 2rem;
      display: flex;
      align-items: center;
    }

    .player1 {
    }

    .player2 {
      flex-direction: row-reverse;
    }

    .player-name {
      font-size: 2rem;
    }
  }

  .game-window {
    flex: 1;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .game-footer {
    background-color: #f7f7f7;
    display: flex;
    height: 4rem;
    align-items: center;
    padding: 0 2rem;
    justify-content: flex-end;
  }
}
</style>