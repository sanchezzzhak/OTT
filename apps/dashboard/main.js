import {createApp} from 'vue';
import {createPinia} from 'pinia';
import {createI18n} from 'vue-i18n';

// css/scss
import './assets/scss/main.scss'

// scripts
import 'bootstrap/js/index.umd.js'
import bsInput from "./components/bootstrap/bsInput.vue";
import bsPasswordEye from "./components/bootstrap/bsPasswordEye.vue";
import bsSwitch from "./components/bootstrap/bsSwitch.vue";
import bsCopy from "./components/bootstrap/bsCopy.vue";
import HeaderNav from "./components/HeaderNav.vue";
import Sidebar from "./components/Sidebar.vue";
import bsNavPills from "./components/bootstrap/bsNavPills.vue";
import DefaultLayout from './layouts/Default.vue';

import App from './App.vue';
import {messages} from './locales/messages';
import router from './routes';

// i18n init
const i18n = createI18n({
  locale: localStorage.getItem('language') || navigator.language,
  fallbackLocale: 'en',
  messages,
  legacy: false
});

// app init
const app = createApp(App);
app.use(createPinia());
app.use(router)
app.use(i18n);

app.config.globalProperties.mode = 'production';

// components
app.component('bs-input', bsInput);
app.component('bs-password-eye', bsPasswordEye);
app.component('bs-switch', bsSwitch);
app.component('bs-copy', bsCopy);
app.component('sidebar', Sidebar);
app.component('bs-nav-pills', bsNavPills);
app.component('header-nav', HeaderNav);

// layouts
app.component('default', DefaultLayout);
// app.component('auth', AuthLayout);
// app.component('dash', DashLayout);

// render
app.mount('#app');

