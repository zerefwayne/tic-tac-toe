<template>
  <div id="app">
    <div class="app-sidebar-container">
      <app-sidebar v-bind:user="user" v-bind:users="users"/>
    </div>
    <div class="game">
      <template v-if="!inGame">
        <h3>New Game</h3>
        <button class="btn btn-primary mt-4" @click="createGame">New Game</button>
        <hr class="mt-4 mb-4" />
        <h3>Join Game</h3>
        <form class="mt-4" @submit.prevent="joinGame">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Game ID"
              style="width: 300px"
              v-model="joinGameId"
            />
          </div>
          <div class="form-group">
            <button class="btn btn-primary" type="submit">Join Game</button>
          </div>
        </form>
      </template>
      <template v-if="inGame">
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
      </template>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";

export default {
  name: "App",
  components: {
    "app-sidebar": Sidebar
  },
  data() {
    return {
      user: {
        id: "",
        isPlaying: false
      },
      users: [],
      inGame: false,
      joinGameId: null,
      game: null,
      isMyMove: false
    };
  },
  methods: {
    joinGame() {
      this.$socket.emit("JOIN_GAME", this.joinGameId);
      this.joinGameId = null;
    },
    createGame() {
      console.log("Creating new game!");
      this.$socket.emit("NEW_GAME");
    },
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
  },
  mounted() {
    this.$socket.on("INIT", data => {
      this.$store.commit("updateUser", data.user);
      this.$store.commit("updateUsers", data.users);
    });

    this.$socket.on("JOIN_USER", data => {
      this.$store.commit("joinUser", data.user);
    });

    this.$socket.on("LEAVE_USER", data => {
      this.$store.commit("leaveUser", data.user);
    });

    this.$socket.on("ENTER_GAME", data => {
      console.log(data);

      this.game = data.game;
      this.inGame = true;
    });

    this.$socket.on("UPDATE_GAME", data => {
      console.log("update", data);
      this.game = data.game;
    });

    this.$socket.on("LEAVE_GAME", () => {
      this.inGame = false;
    });
  }
};
</script>

<style lang="scss">
#app {
  font-family: "IBM Plex Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100%;
  position: relative;

  display: flex;
  justify-items: stretch;

  .app-sidebar-container {
    flex: 22% 0 0;
    border-right: 1px solid #dddddd;
  }

  .game {
    flex: 1 0 0;
    padding: 2rem;
  }

  .grid {
    td {
      width: 100px;
      height: 100px;
      text-align: center;
      cursor: pointer;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      border: 1px solid gray;
    }
    border-collapse: collapse;
  }
}
</style>
