import Vue from "vue";
import App from "./App.vue";

import VueSocketIO from "vue-socket.io";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.scss";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:5000/",
  })
);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
