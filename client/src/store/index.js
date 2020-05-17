import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: "Aayush",
      isPlaying: false,
    },
    users: [],
    activeComponent: "app-welcome",
    game: null,
  },
  mutations: {
    updateGame(state, payload) {
      state.game = payload;
    },
    switchToDashboard(state) {
      state.activeComponent = "app-dashboard"
    },
    switchToGame(state) {
      state.activeComponent = "app-gamescreen"
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    updateUsers(state, payload) {
      state.users = payload;
      state.users.sort((a, b) => (a.id < b.id ? -1 : 1));
    },
    joinUser(state, payload) {
      state.users.push(payload);
      state.users.sort((a, b) => (a.id < b.id ? -1 : 1));
    },
    leaveUser(state, payload) {
      state.users = state.users.filter(user => {
        return user.id != payload.id;
      });
      state.users.sort((a, b) => (a.id < b.id ? -1 : 1));
    }
  },
  actions: {},
  modules: {},
});
