import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import Home from '../views/home.vue';
import Login from '../views/login.vue';

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {title: 'OTT - Home'},
  }, {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: ifNotAuthenticated
  }
];

const router = new VueRouter({
  mode: 'history',
  base: 'Home',
  routes,
});

export default router;