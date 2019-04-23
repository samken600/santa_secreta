import Vue from "vue";
import App from "./App.vue";
import List from "./List.vue";
import firebase from "firebase";

var th = true;

var main = new Vue({
  el: "#app",
  render: h => h(App)
  // renders the app.vue and puts in index
});
var one = new Vue({
  el: "#list",
  render: h => h(List),
  data: {
    title: "sfff"
  }
  // renders the app.vue and puts in index
});
