import Vue from "vue";
import Login from "./Login.vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const Log = { template: "<div><h1>CRAZY Log</h1></div>" };

const routes = [
  { path: "/", component: Login },
  { path: "/log", component: Log }
];

const router = new VueRouter({
  routes
});

const app = new Vue({
  router,
  data: {
    userID: ""
  }
}).$mount("#app");

// var main = new Vue({
//   el: "#app",
//   render: h => h(App)
//   // renders the app.vue and puts in index
// });
