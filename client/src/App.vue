<template>
  <div id="app">
    <div class="app-sidebar-container">
      <template v-if="activeComponent != 'app-welcome'">
        <app-sidebar v-bind:user="user" v-bind:users="users" />
      </template>
    </div>
    <div class="app-content-container">
        <component :is="activeComponent"></component>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Sidebar from "./components/Sidebar.vue";
import Dashboard from "./components/Dashboard.vue";
import GameScreen from "./components/GameScreen.vue";
import Welcome from "./components/Welcome.vue";

export default {
  name: "App",
  components: {
    "app-sidebar": Sidebar,
    "app-gamescreen": GameScreen,
    "app-dashboard": Dashboard,
    "app-welcome": Welcome,
  },
  data() {
    return {
      inGame: false,
      joinGameId: null,
      game: null,
      isMyMove: false
    };
  },
  computed: mapState({
    user: state => state.user,
    users: state => state.users,
    activeComponent: state => state.activeComponent
  }),
  mounted() {

    this.$socket.on("INIT", data => {
      console.log("init", data);
      this.$store.commit("updateUser", data.user);
      this.$store.commit("updateUsers", data.users);
      this.$store.commit("switchToDashboard");
    });

    this.$socket.on("JOIN_USER", data => {
      this.$store.commit("joinUser", data.user);
    });

    this.$socket.on("LEAVE_USER", data => {
      this.$store.commit("leaveUser", data.user);
    });

    this.$socket.on("ENTER_GAME", data => {
      this.$store.commit("switchToGame");
      this.$store.commit("updateGame", data.game);
    });

    this.$socket.on("UPDATE_GAME", data => {
      this.$store.commit("updateGame", data.game);
    });

    this.$socket.on("LEAVE_GAME", () => {
      this.$store.commit("switchToDashboard");
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
  align-items: stretch;

  .app-sidebar-container {
    flex: 22% 0 0;
    background-color: #0052cc;
  }

  .app-content-container {
    flex: 1 0 0;
  }

  
}
</style>
