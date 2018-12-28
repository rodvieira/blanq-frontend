import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/Login.vue'
import Empresa from '../pages/Empresa.vue'
import Contato from '../pages/Contato.vue'

Vue.use(Router)

export default new Router({
  history:true,
  mode: 'history',
  routes: [
      {
        path: '/',
        name: 'Login',
        component: Login
      },
      {
        path: '/contato',
        name: 'contato',
        component: Contato
      },
      {
        path: '/empresa',
        name: 'empresa',
        component: Empresa
      }
  ]
})