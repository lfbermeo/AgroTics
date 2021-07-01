import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

import router from "./routes";

//importamos vue-router
import VueRouter from "vue-router";

// //uso de vue-router
Vue.use(VueRouter);

Vue.config.productionTip = false;

Vue.prototype.$API_URI = "https://agrotics-api.herokuapp.com/api/v1.0/";

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
