import {createRouter, createWebHashHistory} from 'vue-router'
import store from '../stores';

const DEFAULT_TITLE = 'OTT';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "login" */ '../views/Home.vue'),
    meta: {
      title: 'Home'
    }
  }, {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      title: 'Login',
      layout: 'auth'
    }
  }, {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    meta: {
      title: 'Register',
      layout: 'auth'
    }
  },{
    path: '/remind',
    name: 'Remind',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    meta: {
      title: 'Remind',
      layout: 'auth'
    }
  },
  //  {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
  //   meta: {
  //     auth: true,
  //     title: 'Dashboard'
  //   }
  // }
];


const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (store.getters.isAuth) {
      return next();
    }
    return next("/login");
  }
  document.title = to.meta.title || DEFAULT_TITLE;
  next();
});
export default router;
