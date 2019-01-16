import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
// import state from './state'
// import mutations from './mutations'

Vue.use(Vuex);
Vue.use(VueAxios, axios);


export default new Vuex.Store({

  state: {
    token: window.localStorage.getItem("token")
  },
  actions: {
    loadToken({ commit }){
      // console.log(token + "teste");
      axios({
        url: "https://api.moskitcrm.com/v1/contacts",
        method: "GET",
        headers: {
          apikey: window.localStorage.getItem("token")
        }
      })
        .then(r => {
          let teste1 = r.data;
          commit("SET_TOKEN", teste1);
          console.log(teste1);
        })
        .catch(err => {
          console.log(token);
        });
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    }
  },
  getters : {
    isToken: state => state.token
  }
});
