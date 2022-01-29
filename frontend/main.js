import {createApp} from 'vue';
import router from './routes';

import axios from "axios";
import store from './stores'

// css/scss
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/scss/main.scss'
// scripts
import 'bootstrap/dist/js/bootstrap.min'


const axiosInstance = axios.create({
  baseURL: '//' + navigator.host + ':3001'
});

import DefaultLayout from './layouts/Default.vue';
import AuthLayout from './layouts/Auth.vue';
import DashLayout from './layouts/Dash.vue';
import App from './App.vue';

const app = createApp(App);
app.config.globalProperties.$axios = axiosInstance;
app.config.globalProperties.mode = 'production';

app.component('default', DefaultLayout);
app.component('auth', AuthLayout);
app.component('dash', DashLayout);

app.use(store)
app.use(router)
app.mount('#app');
