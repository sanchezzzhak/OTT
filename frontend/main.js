import {createApp} from 'vue';
import router from './routes';

import store from './stores'

// css/scss
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/scss/main.scss'
// scripts
import 'bootstrap/dist/js/bootstrap.min'



import DefaultLayout from './layouts/Default.vue';
import AuthLayout from './layouts/Auth.vue';
import DashLayout from './layouts/Dash.vue';
import App from './App.vue';

const app = createApp(App);
app.config.globalProperties.mode = 'production';

app.component('default', DefaultLayout);
app.component('auth', AuthLayout);
app.component('dash', DashLayout);

app.use(store)
app.use(router)
app.mount('#app');
