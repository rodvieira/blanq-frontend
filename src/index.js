import Vue from "vue";
import App from "./App.vue";
import VueMaterial from "vue-material";
import VueSweetalert2 from 'vue-sweetalert2';
import "vue-material/dist/vue-material.min.css";
import router from "./router";
import store from "./store";

Vue.use(VueMaterial);
Vue.use(VueSweetalert2);

new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
