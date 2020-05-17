<template>
  <div class="app-sidebar">
    <div class="title-box">
      <h2 class="title">XOXO</h2>
      <h6 class="subtitle">A TicTacToe Game</h6>
    </div>
    <div class="user-details">Welcome, {{user.id}}</div>
    <div class="online-users">
      <div class="heading">
        <p>Online Users</p>
        <div>{{ users.length }}</div>
      </div>
      <div class="user-list-container">
        <vue-scroll
          :ops="{bar: {
          background: '#ffffff',
          keepShow: false,
          size: '6px',
          minSize: 0.2,
          opacity: '0.9'
        },}"
        >
          <ul class="user-list">
            <li class="user-list-item" v-for="user in users" :key="user.id">{{user.id}}</li>
          </ul>
        </vue-scroll>
      </div>
    </div>
    <div class="credits">
      Developed by <a href="https://www.github.com/zerefwayne" target="_blank" class="profile-link">Aayush Joglekar</a>
    </div>
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
  background-color: #0052cc;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .title-box {
    background-color: #172b4d;
    color: white;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      font-family: "IBM Plex Sans";
      font-size: 3rem;
      margin-bottom: 0;
    }

    .subtitle {
      color: #f2f2f2;
    }
  }

  .user-details {
    padding: 1rem;
    background-color: darken($color: #0052cc, $amount: 2%);
    color: white;
    text-align: center;
  }

  .online-users {
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    padding: 1.5rem;

    .heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;

      p {
        font-size: 1.4rem;
        margin-bottom: 0;
      }

      div {
        color: white;
        font-weight: bold;
      }
    }

    .user-list-container {
      flex: 1 0 0;
      background-color: darken($color: #0052cc, $amount: 5%);
      border-radius: 3px;
      border-radius: 4px;
      overflow-x: hidden;
      margin-top: 1rem;

      display: flex;
      flex-direction: column;
      justify-content: stretch;

      .user-list {
        list-style: none;
        flex: 1;

        .user-list-item {
          color: white;
          padding: 1rem 1rem 0.5rem 1rem;
        }
      }
    }
  }

  .credits {
    padding: 1rem;
    background-color: darken($color: #0052CC, $amount: 3%);
    color: white;
    text-align: center;

    .profile-link{
      text-decoration: none;
      text-decoration: underline;
      color: white;
    }

  }
}
</style>