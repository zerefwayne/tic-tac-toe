<template>
  <div class="app-dashboard">
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
  mounted() {
    
  }
};
</script>

<style lang="scss">
</style>