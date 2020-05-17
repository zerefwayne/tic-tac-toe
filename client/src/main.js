import Vue from "vue";
import App from "./App.vue";

import store from "./store";

import socket from "socket.io-client";

import vuescroll from 'vuescroll';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.scss";

const io = socket.connect("http://localhost:5000/");

Vue.use(vuescroll);

Vue.prototype.$socket = io;

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
