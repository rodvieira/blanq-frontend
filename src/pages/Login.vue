<template>
  <div class="page-login">
    <div class="md-elevation-24 box-login">
      <h4>Insira o token no campo abaixo!</h4>
      <md-field md-inline>
        <md-input v-model="teste"></md-input>
        <md-button @click="testeToken()">TESTE</md-button>
        <md-button @click="tokenTeste()">token</md-button>
      </md-field>
    </div>
  </div>
</template>

<script>
// import authLogin from '../services/login.js'
// import { mapState } from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      // token: "",
      // authToken: [],
      teste: ''
    };
  },
  // computed: mapState([
  //   'token',
  // ]),
    computed: {
      isToken() {
        return this.$store.getters.isToken
      }
    },
  methods: {
    testeToken() {
      localStorage.setItem('token', this.teste)
      // this.$store.dispatch('loadToken')
    },
    tokenTeste() {
      this.$store.dispatch('loadToken')
    }
  },


  // mounted() {
  //   authLogin
  //     .listar()
  //     .then(result => {
  //       this.authToken = result.data;
  //     })
  //     .catch(() => {
        
  //     });
  // },
};
</script>

<style lang="scss" scoped>
.page-login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-login {
  width: 40%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}
h4 {
  color: #fff;
  text-align: center;
  font-size: 22px;
  margin: 0px;
}
.md-field {
  width: 80% !important;
}
.md-input {
  background-color: #fff !important;
  border-radius: 30px;
  padding: 15px !important;
}
</style>

