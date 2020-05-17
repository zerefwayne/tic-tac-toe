<template>
  <div class="app-sidebar">
      <div class="title-box">
          <h2 class="title">XOXO</h2>
          <h6 class="subtitle">A TicTacToe Game</h6>
      </div>
      <div class="user-details">
          Welcome, {{user.id}}
      </div>
      <h3 style="color: #666;">Online Users</h3>
      <ul class="list-group mt-3">
        <li class="list-group-item" v-for="user in users" :key="user.id">
          <small class="mr-2">{{ user.isPlaying ? "🟡": "🟢"}}</small>
          {{user.id}}
        </li>
      </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Sidebar",
  data() {
    return {};
  },
  mounted() {
    console.log(this.user);
    console.log(this.users);
    console.log(this.$store.state);
  },
  computed: mapState({
    user: state => state.user,
    users: state => state.users
  })
};
</script>

<style lang="scss">
.app-sidebar {
  width: 100%;
  height: 100%;
  background-color: #0052CC;
  display: flex;
  flex-direction: column;
  align-items: stretch;

    .title-box {

        background-color: #172B4D;
        color: white;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .title {
            font-family: 'IBM Plex Sans';
            font-size: 3rem;
            margin-bottom: 0;
        }

        .subtitle {
            color: #F2F2F2;
        }

    }

    .user-details {
        padding: 1rem;
        background-color: darken($color: #0052CC, $amount: 2%);
        color: white;
        text-align: center;
    }

}
</style>