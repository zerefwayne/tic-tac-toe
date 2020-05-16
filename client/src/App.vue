<template>
  <div id="app">
    Hey
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  mounted() {
    console.log("connected", this.$socket);
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
