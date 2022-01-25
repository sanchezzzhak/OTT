import Vue from "vue";
import VueRouter from "vue-router";
import RouterPrefetch from 'vue-router-prefetch'
import App from "./app";
// import router from "./router/index";

// import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n"
// import './registerServiceWorker'

import "bootstrap/scss/bootstrap.scss"
import "./assets/scss/main.scss"

// Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);

/* eslint-disable no-new */
new Vue({
  // router,
  i18n,
  render: h => h(App)
}).$mount("#app");
