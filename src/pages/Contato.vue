<template>
  <div>
    <!-- Add contato -->
    <section>
      <md-dialog :md-active.sync="showAddContato">
        <md-dialog-title>Novo contato</md-dialog-title>
        <div class="modal-conteudo">
          <div class="form-modal">
            <label for="nome">Nome</label>
            <input v-model="objContato.nome" type="text" placeholder="Ex: John Doe">
          </div>

          <div class="form-modal">
            <label for="telefone">Telefone</label>
            <input v-model="objContato.phone" type="text" placeholder="Ex: (00)00000-0000" maxlength="15">
            <span @click="arrayPush('telefone')">
              <i class="fas fa-plus-circle"></i> 
            </span>
            <span class="tags-contato" v-for="telefone in addContato.phones" :key="telefone">{{telefone}}</span>
          </div>

          <div class="form-modal">
            <label for="email">E-mail</label>
            <input v-model="objContato.email" type="text" placeholder="Ex: johndoe@mail.com">
            <span @click="arrayPush('email')">
              <i class="fas fa-plus-circle"></i> 
            </span>
            <span class="tags-contato" v-for="email in addContato.emails" :key="email">{{email}}</span>
          </div>

          <!-- <div class="form-modal">
            <label for="empresas">Empresas relacionadas</label>
            <input
              v-model="employers"
              type="text"
              placeholder="Ex: Google, Facebook.."
            >
            <span @click="arrayPush('empresas')">
              <i class="fas fa-plus-circle"></i> 
            </span>
            <p v-for="empresas in addContato.empresasRelacionadas" :key="empresas">{{empresas}}</p>
          </div> -->
          
        </div>
        <md-dialog-actions>
          <md-button class="md-primary modal-btn" @click="showAddContato = false">Close</md-button>
          <md-button class="md-primary modal-btn" @click="postContato()"> Save </md-button>
        </md-dialog-actions>
      </md-dialog>
    </section>
    <!-- / Add contato -->
    <!-- Detalhes contato -->
    <div>
      <md-dialog :md-active.sync="showDetails">
        <md-dialog-title>Detalhes do Contato</md-dialog-title>
        <div class="modal-conteudo">
          <div class="form-modal">
            <label for="nome">Nome</label>
            <input type="text" :value="getContatoId.name">
          </div>

          <div class="form-modal">
            <label for="telefone">Telefone</label>
            <input type="text" maxlength="15" v-for="telefone in getContatoId.phones" :key="telefone.id" :value="telefone.number">
          </div>

          <div class="form-modal">
            <label for="email">E-mail</label>
            <input type="text" v-for="email in getContatoId.emails" :key="email.id" :value="email.address">
          </div>

          <!-- <div class="form-modal">
            <label for="empresas">Empresas relacionadas</label>
            <input
              type="text" value="Google">
            <p v-for="empresas in getContatoId.empresasRelacionadas" :key="empresas">{{empresas}}</p>
          </div> -->
        </div>
      </md-dialog>
    </div>
    <!-- / Detalhes contato -->

    <Header title="Contatos" />

    <section class="rdv-content">
      <div class="rdv-buttons">
        <router-link to="/empresa">
          <md-button class="md-dense md-raised md-primary buttons-rdv">
            <i class="fas fa-building"></i>
            Empresas</md-button>
        </router-link>
        <md-button
          class="md-dense md-raised md-primary buttons-rdv"
          @click="showAddContato = true"
        >
        <i class="fas fa-plus-circle"></i>  
        Adicionar</md-button>
      </div>
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <ul>
            <li class="md-elevation-2" v-for="contato in getContato" :key="contato.id">
              <span class="md-subheading">{{contato.name}}</span>
              <div class="icons-list">
                <span @click="contatoId(contato.id)">
                  <i class="fas fa-info-circle"></i>
                </span>
                <span @click="deleteContato(contato.id)">
                  <i class="fas fa-trash-alt"></i>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>   
  </div>
</template>


<script>
// const email = ['rodrigo@mail.com', 'marcela@mail.com', 'otavio@mail.com'];

// let resultado = email.map((element) => {
//     return element = {address: element}
// })

// const teste = [{
//     emails: JSON.stringify(resultado)
// }]

// console.log(teste);
import Header from '../components/Header';
import { mapState, mapActions } from "vuex";

export default {
  name: "contato",
  components: {
    Header,
  },
  data() {
    return {
      showDetails: false,
      showAddContato: false,   
      name: '',
      responsible: null,
      objContato: {
        nome:'',
        email: [],
        phone: [],
      }
      
    };
  },
  
  computed: {
    ...mapState("Contato", ["addContato"]),
    ...mapState("Contato", ["getContato"]),
    ...mapState("Contato", ["getContatoId"]),
    ...mapState("Contato", ["delContato"]),
    ...mapState("Contato", ["savContato"]),
    
  },
  watch: {
    'objContato.phone'(val){
      let valor = val
      valor = valor.replace(/\D/g,"");
      valor = valor.replace(/^(\d{2})(\d)/g,"($1) $2");
      valor = valor.replace(/(\d)(\d{4})$/,"$1-$2");
      this.objContato.phone = valor ;
    },
    delContato() {
      if (this.delContato === 'success') {
        this.$swal.fire({
          type: 'success',
          title: 'Contato excluido com sucesso',
        });
        this.getContatos();        
      } else if (this.delContato === 'error') {
        this.$swal.fire({
          type: 'error',
          title: 'Erro ao excluir o contato',
        });
      }
    },
    savContato(){
      if (this.savContato === 'success') {
        this.$swal.fire({
          type: 'success',
          title: 'Contato adicionado com sucesso',
        });
        this.getContatos();        
      } else if (this.savContato === 'error') {
        this.$swal.fire({
          type: 'error',
          title: 'Erro ao adicionar o contato',
        });
      }
    }
    
  },
  created() {
    this.getContatos();
  },
  methods: {
    ...mapActions("Contato", ["salvarContato"]),
    ...mapActions("Contato", ["getContatos"]),
    ...mapActions("Contato", ["deleteContato"]),
    ...mapActions("Contato", ["getContatoById"]),

    postContato() {
      console.log(this.checkForm())
      if(this.checkForm() == true) {
        let resEmail = this.addContato.emails.map((element) => {
          return element = {address: element}
        });

        let resPhone = this.addContato.phones.map((element) => {
          return element = {number: element}
        });

        const idUser = window.localStorage.getItem('user');
        let nome = this.objContato.nome;
        let email = resEmail;
        let telefone = resPhone;
        let id = parseInt(idUser)
        
        const postObj = {
          name: nome,
          responsible: {
            id: id,
          },
          emails: email,
          phones: telefone,
        }
        this.salvarContato(postObj);
        this.showAddContato = false;
      }
    },
    arrayPush(type) {     
      if (type == 'telefone') {
        this.addContato.phones.push(this.objContato.phone);
        this.objContato.phone = '';
      } 
      else if(type == 'email') {
        if(this.validEmail(this.objContato.email)) {
          this.addContato.emails.push(this.objContato.email);
          this.objContato.email = '';
        } else {
          this.$swal.fire({
            text: 'Email inválido!',
            type: 'error',
            timer: 1000,
            showConfirmButton: false,
            position: 'top-end',
            width: 200,
          });
          this.objContato.email = '';
        }
      }
    },

    contatoId(id) {      
      this.getContatoById(id);
      this.showDetails = true;
    },

    checkForm() {
      if (this.objContato.nome.length <= 0) {
        alert('O nome é obrigatório.');
      }
      else if (this.addContato.phones.length <= 0) {
        alert('O telefone é obrigatório.');
      }
      else if (this.addContato.emails.length <= 0) {        
        alert('O email é obrigatório.');
      } else {
        return true
      }
    },

    validEmail (email) {
      // eslint-disable-next-line
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../assets/style.scss';

a {
  color: $text-color-white;
  text-decoration: none;
}
.buttons-rdv {
  margin: $marginbt-default;
  color: $text-color-white;
}
.rdv-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.md-layout {
  width: 100%;
}
.md-layout-item ul {
  padding-left: 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.md-layout-item li {
  list-style: none;
  border: none;
  background-color: $background-color-default;
  width: 50%;
  margin-bottom: $marginbt-default;
  padding: $padding-default;
  border-radius: $radius-default;
  display: flex;
  justify-content: space-between;
}
.md-layout-item li span {
  color: $text-color-grey;
}
.icons-list span {
  margin-left:10px;
  vertical-align: middle;
  cursor: pointer;
}
.md-layout-item li span:nth-of-type(2) {
  float: right;
  cursor: pointer;
}
//Modal
.md-dialog {
  background-color: $background-color-default;
  border-radius: $radius-default;
  max-height: none;
}
.modal-conteudo {
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 500px;
}
.form-modal {
  width: 100%;
  color: #666;
}
.md-dialog-title {
  color: #666;
}
.form-modal input {
  width: 90%;
  padding: 10px;
  margin: 10px;
  border-radius: $radius-default;
  background-color: #ece8e8;
  border: none;
  color: $text-color-grey;
}
.form-modal span {
  cursor: pointer;
}
.tags-contato {
  color: $text-color-white;
  background-color: $text-color-grey;
  padding: 5px;
  border-radius: 6px;
  margin-right: 5px;
  font-size: 11px;

}
.modal-btn {
  background-color: #dcdcdc;
  color: #666;
}
// style placeholder
::-webkit-input-placeholder { /* Edge */
  font-style: italic;
  color: #a5a5a5;
}

:-ms-input-placeholder { /* Internet Explorer */
  font-style: italic;
  color: #a5a5a5;
}

::placeholder {
  font-style: italic;
  color: #a5a5a5;
}
</style>