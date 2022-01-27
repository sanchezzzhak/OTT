import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import Home from "../views/home.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  }
];

const router = new VueRouter({
  mode: "history",
  base: 'Home',
  routes,
});


export default router;