import {createRouter, createWebHashHistory} from 'vue-router'
import store from '../stores';

const DEFAULT_TITLE = 'OTT';

const checkNotAuth = (to, from, next) => {
  if (store.getters.isAuth) {
    next('/')
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Home'
    }
  }, {
    path: '/sing-in',
    name: 'SingIn',
    component: () => import('../views/SingIn.vue'),
    meta: {
      title: 'Sing In',
      layout: 'auth'
    },
    beforeEnter: checkNotAuth
  }, {
    path: '/sing-up',
    name: 'SingUp',
    component: () => import('../views/SingUp.vue'),
    meta: {
      title: 'Sing Up',
      layout: 'auth'
    },
    beforeEnter: checkNotAuth
  }, {
    path: '/logout',
    name: 'Logout',
    meta: {
      auth: true
    },
    beforeEnter: (to, from, next) => {
      store.dispatch('logout').then(res => next('/'))
    }
  }, {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      auth: true,
      title: 'Dashboard',
      layout: 'dash'
    }
  }
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
