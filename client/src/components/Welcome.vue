<template>
  <div class="app-welcome">
    <h2 class="display-4">Welcome to XOXO!</h2>
    <form class="mt-4" @submit.prevent="initUser">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Enter your name"
          style="width: 300px"
          v-model="name"
        />
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="submit">Continue</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "app-welcome",
  data() {
    return {
        name: null,
    };
  },
  methods: {
      initUser() {

        const payload = {
            name: this.name
        };

        this.$socket.emit("INIT_USER", payload);

      }
  },
  mounted() {}
};
</script>

<style lang="scss">
.app-welcome {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>