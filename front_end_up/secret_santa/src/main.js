import Vue from "vue";
import Login from "./Login.vue";
import UserHome from "./UserHome.vue";
import ListView from "./ListView.vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Login
  },
  {
    path: "/home",
    component: UserHome,
    name: "home",
    props: true
  },
  {
    path: "/list-view",
    component: ListView,
    name: "list-view",
    props: true
  }
];

const router = new VueRouter({
  routes,
  mode: "history" //removes /#/ from default url
});

const app = new Vue({
  router
}).$mount("#app");
