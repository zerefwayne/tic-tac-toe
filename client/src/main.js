import Vue from "vue";
import App from "./App.vue";

import store from "./store";

import socket from "socket.io-client";

import vuescroll from "vuescroll";
import VueClipboard from "vue-clipboard2";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.scss";

const io = socket.connect(process.env.VUE_APP_SOCKET_URL || "http://localhost:5000/");

console.log(io);

Vue.use(vuescroll);
Vue.use(VueClipboard);

Vue.prototype.$socket = io;

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
