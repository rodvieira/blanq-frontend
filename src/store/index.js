import Vue from "vue";
import Vuex from "vuex";
import Login from "./modules/Login/store";
import Contato from "./modules/Contato/store";


Vue.use(Vuex);

const modules = {
  Login,
  Contato
};

export default new Vuex.Store({
  modules
});
