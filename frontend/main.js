import {createApp} from 'vue';
import router from './routes';

import store from './stores'

// css/scss
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/scss/main.scss'
// scripts
import 'bootstrap/dist/js/bootstrap.min'


import bsInput from "./components/bootstrap/bsInput.vue";
import bsSwitch from "./components/bootstrap/bsSwitch.vue";
import HeaderNav from "./components/HeaderNav.vue";
import Sidebar from "./components/Sidebar.vue";
import DefaultLayout from './layouts/Default.vue';
import AuthLayout from './layouts/Auth.vue';
import DashLayout from './layouts/Dash.vue';
import App from './App.vue';

// app init
const app = createApp(App);
app.use(store)
app.use(router)

app.config.globalProperties.mode = 'production';
// components
app.component('bs-input', bsInput);
app.component('bs-switch', bsSwitch);
app.component('sidebar', Sidebar);
app.component('header-nav', HeaderNav);
// layouts
app.component('default', DefaultLayout);
app.component('auth', AuthLayout);
app.component('dash', DashLayout);
app.component('dash', DashLayout);

app.mount('#app');
