import {createRouter, createWebHashHistory} from 'vue-router';
import {useStore} from '../stores/main-store';

const DEFAULT_TITLE = 'OTT';

const checkNotAuth = (to, from, next) => {
  if (useStore().isAuth) {
    return next('/');
  }
  next();
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Home',
    },
  }, {
    path: '/forgot',
    name: 'Forgot',
    component: () => import('../views/Forgot.vue'),
    meta: {
      title: 'Forgot',
      layout: 'auth',
    },
    beforeEnter: checkNotAuth,
  }, {
    path: '/sing-in',
    name: 'SingIn',
    component: () => import('../views/SingIn.vue'),
    meta: {
      title: 'Sing In',
      layout: 'auth',
    },
    beforeEnter: checkNotAuth,
  }, {
    path: '/sing-up',
    name: 'SingUp',
    component: () => import('../views/SingUp.vue'),
    meta: {
      title: 'Sing Up',
      layout: 'auth',
    },
    beforeEnter: checkNotAuth,
  }, {
    path: '/logout',
    name: 'Logout',
    meta: {
      auth: true,
    },
    beforeEnter: (to, from, next) => {
      useStore().logout().then(res => next('/'));
    },
  }, {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      auth: true,
      title: 'Dashboard',
      layout: 'dash',
    },
    children: [
      {
        name: 'Stat',
        path: 'stat',
        component: () => import('../views/dashboard/Stat.vue'),
        
      }, {
        name: 'Settings',
        path: 'settings',
        component: () => import('../views/dashboard/Settings.vue'),
        children: [
          {
            name: 'Tracker links',
            path: '',
            component: () => import('../views/dashboard/settings/TrackerLinks.vue'),
          }, {
            name: 'Settings User',
            path: 'user',
            component: () => import('../views/dashboard/settings/User.vue'),
          }, {
            name: 'Settings Notification',
            path: 'notification',
            component: () => import('../views/dashboard/settings/Notification.vue'),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (useStore().isAuth) {
      return next();
    }
    return next('/sing-in');
  }
  document.title = to.meta.title || DEFAULT_TITLE;
  next();
});

export default router;
