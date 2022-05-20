import {createApp} from 'vue';
import {createPinia} from 'pinia';
import {createI18n} from 'vue-i18n';

// css/scss
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/scss/main.scss'
// scripts
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap-icons/font/bootstrap-icons.css'

import bsInput from "./components/bootstrap/bsInput.vue";
import bsSwitch from "./components/bootstrap/bsSwitch.vue";
import bsCopy from "./components/bootstrap/bsCopy.vue";
import HeaderNav from "./components/HeaderNav.vue";
import Sidebar from "./components/Sidebar.vue";
import DefaultLayout from './layouts/Default.vue';
import AuthLayout from './layouts/Auth.vue';
import DashLayout from './layouts/Dash.vue';

import App from './App.vue';
import {messages} from './locales/messages';
import router from './routes';

// i18n init
const i18n = createI18n({
  locale: localStorage.getItem('language') || 'en',
  fallbackLocale: 'en',
  messages,
});

// app init
const app = createApp(App);
app.use(createPinia());
app.use(router)
app.use(i18n);

app.config.globalProperties.mode = 'production';
// components
app.component('bs-input', bsInput);
app.component('bs-switch', bsSwitch);
app.component('bs-copy', bsCopy);
app.component('sidebar', Sidebar);
app.component('header-nav', HeaderNav);
// layouts
app.component('default', DefaultLayout);
app.component('auth', AuthLayout);
app.component('dash', DashLayout);
app.mount('#app');

