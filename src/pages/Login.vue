<template>
    <div class="page-login">
       <div class="md-elevation-24 box-login">
            <h4>Insira o token no campo abaixo!</h4>
            <md-field md-inline>
                <md-input></md-input>
            </md-field>
           
       </div>
       <!-- <div>
           <button>
               <router-link to="/contato"> Contato</router-link>
           </button>
           <button>
               <router-link to="/empresa"> Empresa</router-link>
           </button>
       </div> -->
    </div>
</template>

<script>
import authLogin from '../services/login.js'
export default {
    name: 'Login',
    data() {
        return {
            token:'',
            teste:[]
        }
    },

    mounted() {
        authLogin.listar().then((result) => {
            this.teste = result.data;
            console.log(this.teste);
            
        }).catch((err) => {
            console.log(this.teste + 'errou');
        });
    }
}
</script>

<style lang="scss" scoped>
    .page-login {
        height: 100vh;
        background-image: linear-gradient(19deg, #21D4FD, #B721FF);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .box-login {
        width:40%;
        height: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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

