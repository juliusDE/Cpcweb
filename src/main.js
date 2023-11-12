import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import "bootstrap/dist/css/bootstrap.css";
import router from "./router";
import store from "./store";
import Request from "./axios";
import es from "vuetify/es5/locale/es";

Vue.config.productionTip = false;
Vue.prototype.$Request = Request;

Vue.use(Vuetify);

new Vue({
  render: (h) => h(App),
  router, // Agrega el router a la instancia de Vue
  store, // Agrega el store de Vuex a la instancia de Vue
  vuetify: new Vuetify({
    theme: {
      dark: false,
    },

    lang: {
      locales: { es },
      current: "es",
    },
  }),
}).$mount("#app");
