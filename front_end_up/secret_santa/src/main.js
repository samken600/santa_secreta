import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const Main = { template: "<div><h1>CRAZY Main</h1></div>" };
const Log = { template: '<div><p>"userID"<p></div>' };

const routes = [
  { path: "/home", component: App },
  { path: "/log", component: Log }
];

const router = new VueRouter({
  routes
});

const app = new Vue({
  router,
  data: {
    userID: "Ther"
  }
}).$mount("#app");

// var main = new Vue({
//   el: "#app",
//   render: h => h(App)
//   // renders the app.vue and puts in index
// });
