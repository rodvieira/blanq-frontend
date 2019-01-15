import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import VueAxios from 'vue-axios'
// import state from './state'
// import mutations from './mutations'

Vue.use(Vuex);
Vue.use(VueAxios, axios)

const testeToken = localStorage.getItem('token') || ''
export default new Vuex.Store({
    
    state: {
        token: testeToken
      },
      actions: {
        loadToken ({ commit }, token) {
          console.log(token + 'teste')
          axios({
            url: 'https://api.moskitcrm.com/v1/contacts',
            method: 'GET',
            headers: {
              'apikey': token
            }
          }).then(r => {
              token = r.data
              commit('SET_TOKEN', token)
              console.log(token)
          })
          .catch(err => {
            console.log(token)
          })
        }
      },
      mutations: {
        SET_TOKEN (state, token) {
          state.token = token
        }
      }
});