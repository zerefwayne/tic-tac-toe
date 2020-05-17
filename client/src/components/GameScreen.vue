<template>
  <div class="app-game">
    <button class="btn btn-outline-secondary" @click="leaveGame">Leave Game</button>
    <p class="mt-4">Game ID: {{ game.id }}</p>
    <p class="mt-4">{{getStatus()}}</p>
    <p
      v-if="game.players.player1 != null"
    >Player 1: {{ game.players.player1.id }} | {{ game.players.player1.symbol }}</p>
    <p
      v-if="game.players.player2 != null"
    >Player 2: {{ game.players.player2.id }} | {{ game.players.player2.symbol }}</p>

    <button class="btn btn-success" v-if="game.state == 1" @click="startGame">Start Game</button>

    <template v-if="game.state >= 2">
      <h2>{{getMove()}}</h2>

      <div class="mt-5">
        <table class="grid">
          <tr v-for="r in [0, 1, 2]" :key="r">
            <td
              v-for="c in [0, 1, 2]"
              :key="`${r}${c}`"
              @click="() => {playMove(r, c)}"
            >{{ game.board[r][c].player ? game.board[r][c].player.symbol : "" }}</td>
          </tr>
        </table>
      </div>

      <p
        v-if="game.state == 3"
      >{{ game.result.tie ? "It's a tie" : `Player ${game.result.winner.id} won!` }}</p>
      <button @click="resetGame" v-if="game.state == 3" class="btn btn-success">Play Again?</button>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "app-game",
  computed: mapState({
    user: state => state.user,
    game: state => state.game
  }),
  methods: {
    leaveGame() {
      this.$socket.emit("LEAVE_GAME", this.game.id);
    },
    startGame() {
      this.$socket.emit("START_GAME", this.game.id);
    },
    getStatus() {
      let status = "";

      switch (this.game.state) {
        case 0:
          status = "Waiting for 2nd player";
          break;
        case 1:
          status = "Ready to start";
          break;
        case 2:
          status = "In game!";
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
        return "Other's move!";
      }
    },
    playMove(r, c) {
      if (this.game.state != 2) {
        return;
      }

      if (this.isMyMove) {
        const payload = {
          game: this.game.id,
          move: { r, c }
        };

        this.$socket.emit("MOVE_GAME", payload);
      } else {
        alert("Not your move buddy!");
      }
    },
    resetGame() {
      this.$socket.emit("RESET_GAME", this.game.id);
    }
  }
};
</script>

<style lang="scss">
</style>