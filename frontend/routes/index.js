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
    path: '/sing-in',
    name: 'SingIn',
    component: () => import(/* webpackChunkName: "login" */ '../views/SingIn.vue'),
    meta: {
      title: 'Sing In',
      layout: 'auth'
    }
  }, {
    path: '/sing-up',
    name: 'SingUp',
    component: () => import(/* webpackChunkName: "register" */ '../views/SingUp.vue'),
    meta: {
      title: 'Sing Up',
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
    return next("/sing-in");
  }
  document.title = to.meta.title || DEFAULT_TITLE;
  next();
});
export default router;
