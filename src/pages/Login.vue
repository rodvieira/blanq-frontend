<template>
  <div class="page-login">
    <div class="md-elevation-24 box-login">
      <h4>Insira o token no campo abaixo!</h4>
      <md-field md-inline>
        <md-input v-model="modelToken" placeholder="Token"></md-input>
        <md-button @click="validaToken()">Entrar</md-button>
      </md-field>
    </div>
  </div>
</template>

<script>
// baseURL: 'https://api.moskitcrm.com/v1/',
//     headers: {
//         'apikey':'70bac45c-cef6-4c36-bb33-7958a200c96a'
//     }

import { mapState, mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      modelToken: ""
    };
  },

  computed: {
    ...mapState("Login", ["token"])
  },

  methods: {
    ...mapActions("Login", ["loadToken"]),

    validaToken() {
      window.localStorage.setItem('token', this.modelToken);
      this.loadToken(this.modelToken);
      
      setTimeout(() =>{
        let testeTok = window.localStorage.getItem('token')
        if(testeTok == null){
          alert('Token Invalido')
          this.modelToken = '';
        } else {
          this.$router.push('/contato')
        }
      },1000);
      
      
    }
  }
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
  font-size: 1.5rem;
  font-weight: 200;
  margin: 0px;
}
.md-field {
  width: 100% !important;
  display: flex;
  margin: 0px;
  padding-top: 20px;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
}
.md-input {
  background-color: #fff !important;
  border-radius: 4px;
  padding: 15px !important;
  width: 70%;
}
.md-button {
  margin-top: 20px;
  background-color: #fff;
  color: #565656;
}
</style>

