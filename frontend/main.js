import {createApp} from 'vue';
import router from './routes';
import App from './App.vue';
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/scss/main.scss"

const axiosInstance = axios.create({
  baseURL: '//' + navigator.host + ':3001'
});

const app = createApp(App);
app.config.globalProperties.$axios = axiosInstance;
app.config.globalProperties.mode = 'production';

app.use(router)
app.mount('#app')
