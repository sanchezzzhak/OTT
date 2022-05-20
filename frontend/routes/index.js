import {createRouter, createWebHashHistory} from 'vue-router'
import {useStore} from '../stores/main-store';


const DEFAULT_TITLE = 'OTT';

const checkNotAuth = (to, from, next) => {
  const store = useStore();
  if (store.isAuth) {
    return next('/')
  }
  next();
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
      store.logout().then(res => next('/'))
    }
  }, {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      auth: true,
      title: 'Dashboard',
      layout: 'dash'
    },
    children: [
      { path: 'stat', component: () => import('../views/dashboard/Stat.vue') },
    ]
  }
];


const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const store = useStore();
  if (to.matched.some(record => record.meta.auth)) {
    if (store.isAuth) {
      return next();
    }
    return next("/sing-in");
  }
  document.title = to.meta.title || DEFAULT_TITLE;
  next();
});
export default router;
