
import Vue from 'vue';
import App from './App.vue';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
 
Vue.use(VueAxios, axios)
Vue.use(VueMaterial)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});