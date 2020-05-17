<template>
  <div class="app-dashboard">
    <div class="new-game">
      <h3 class="title">New Game</h3>
      <form class="mt-4" @submit.prevent="createGame">
        <div class="form-group">
          <button class="btn btn-new" type="submit">Continue</button>
        </div>
      </form>
    </div>
    <div class="join-game">
      <h3 class="title">Join Game</h3>
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
          <button class="btn btn-join" type="submit">Continue</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-dashboard",
  data() {
    return {
      joinGameId: null
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
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.app-dashboard {
  background-color: red;
  height: 100%;

  display: flex;
  flex-direction: column;

  .new-game {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 5rem;
    border-bottom: 1px solid #dddddd;
    background-color: #ffffff;

    .btn-new {
        background-color: #0052CC;
        color: white;
    }

    .title {
      color: #0052CC;
      font-size: 2.7rem;
    }
  }

  .join-game {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 5rem;
    background-color: darken($color: #FFFFFF, $amount: 2%);

    .btn-join {
        background-color: #0052CC;
        color: white;
    }

    .title {
      color: #0052CC;
      font-size: 2.7rem;
    }
  }
}
</style>