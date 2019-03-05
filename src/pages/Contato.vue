<template>
  <div>
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
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
              <md-tooltip md-direction="bottom">Adicionar</md-tooltip>
            </span>
            <span class="tags-contato" v-for="(telefone, index) in addContato.phones" :key="index">{{telefone}} <span @click="addContato.phones.splice(index, 1)">x</span></span>
          </div>

          <div class="form-modal">
            <label for="email">E-mail</label>
            <input v-model="objContato.email" type="text" placeholder="Ex: johndoe@mail.com">
            <span @click="arrayPush('email')">
              <i class="fas fa-plus-circle"></i>
              <md-tooltip md-direction="bottom">Adicionar</md-tooltip>
            </span>
            <span class="tags-contato" v-for="(email, index) in addContato.emails" :key="index">{{email}} <span @click="addContato.emails.splice(index, 1)">x</span></span>
          </div>
          <div class="form-modal">
            <label for="Empresa"> Contatos Relacionados</label>
            <select v-model="objContato.employers" @click="arrayEmpresa()">
              <option v-for="empresa in getEmpresa" :value="empresa" :key="empresa.id">
                {{empresa.name}}
              </option>
            </select>
            <span class="tags-contato" v-for="(empresa, index) in addContato.company" :key="index">
              {{empresa.name}} 
              <span @click="addContato.company.splice(index, 1)">x</span>
            </span>
          </div>
        </div>
        <md-dialog-actions>
          <md-button class="md-primary modal-btn" @click="closeModalAdd()">Close</md-button>
          <md-button class="md-primary modal-btn" @click="postContato()"> Save </md-button>
        </md-dialog-actions>
      </md-dialog>
    </section>
    <!-- / Add contato -->
    <!-- Detalhes contato -->
    <div>
      <md-dialog :md-active.sync="showDetails">
        <md-dialog-title>
          Detalhes do Contato
          <span class="span-edit" @click="putDisable = false">
            <i class="fas fa-edit"></i>
            <md-tooltip md-direction="bottom">Editar</md-tooltip>
          </span>
        </md-dialog-title>
        
        <div class="modal-conteudo">
          <div class="form-modal">
            <label for="nome">Nome</label>
            <input type="text" v-model="getContatoId.name" :disabled="putDisable">
          </div>

          <div class="form-modal">
            <label for="telefone">Telefone</label>
            <input type="text" maxlength="15" @keyup.enter="arrayPutPush('phone')" v-model="putObjContato.phone" :disabled="putDisable">
            <span @click="arrayPutPush('phone')">
              <i class="fas fa-plus-circle"></i>
              <md-tooltip md-direction="bottom">Adicionar</md-tooltip>
            </span>
            <span class="tags-contato" v-for="(telefone, index) in getContatoId.phones" :key="telefone.id">
              {{telefone.number}} 
              <span v-if="!putDisable" @click="getContatoId.phones.splice(index, 1)">x</span>
            </span>
          </div>

          <div class="form-modal">
            <label for="email">E-mail</label>
            <input type="text" v-model="putObjContato.email" :disabled="putDisable">
            <span @click="arrayPutPush('email')">
              <i class="fas fa-plus-circle"></i>
              <md-tooltip md-direction="bottom">Adicionar</md-tooltip>
            </span>
            <span class="tags-contato" v-for="(email, index) in getContatoId.emails" :key="email.id" >
              {{email.address}} 
              <span v-if="!putDisable" @click="getContatoId.emails.splice(index, 1)">x</span>
            </span>
          </div>

          <div class="form-modal">
            <label for="Empresa"> Contatos Relacionados</label>
            <select v-model="putObjContato.company" @click="arrayPutEmpresa()" :disabled="putDisable">
              <option v-for="empresa in getEmpresa" :value="empresa" :key="empresa.id">
                {{empresa.name}}
              </option>
            </select>
            <span class="tags-contato" v-for="(empresa, index) in getContatoId.company" v-if="empresa.company == undefined" :key="index">
              {{empresa.employers.name}} 
              <span  v-if="!putDisable" @click="getContatoId.company.splice(index, 1)">x</span>
            </span>
            <span class="tags-contato" v-for="(empresa, index) in getContatoId.company" v-if="empresa.company != null" :key="index">
              {{empresa.company.name}} 
              <span  v-if="!putDisable" @click="getContatoId.company.splice(index, 1)">x</span>
            </span>
          </div>
        </div>
        <md-dialog-actions>
          <md-button class="md-primary modal-btn" @click="closeModalPut()">Close</md-button>
          <md-button class="md-primary modal-btn" @click="editContato()"> Save </md-button>
        </md-dialog-actions>
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
                  <md-tooltip md-direction="bottom">Detalhes</md-tooltip>
                </span>
                <span @click="deleteContato(contato.id)">
                  <i class="fas fa-trash-alt"></i>
                  <md-tooltip md-direction="bottom">Excluir</md-tooltip>
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
      responsible: null,
      objContato: {
        nome:'',
        email: [],
        phone: [],
        employers: []
      },
      putDisable: true,
      putObjContato: {
        nome: '',
        email: [],
        phone: [],
        company: [],
      }
    };
  },

  computed: {
    ...mapState("Contato", ["addContato"]),
    ...mapState("Contato", ["getContato"]),
    ...mapState("Contato", ["getContatoId"]),
    ...mapState("Contato", ["delContato"]),
    ...mapState("Contato", ["savContato"]),
    ...mapState("Contato", ["putContato"]),
    ...mapState("Empresa", ["getEmpresa"]),
  },
  watch: {
    'objContato.phone'(val){
      if(this.objContato.phone.length > 0) {
        let valor = this.maskTelefone(val)
        this.objContato.phone = valor;
      }
    },
    'putObjContato.phone'(val){
      if(this.putObjContato.phone.length > 0) {
        let valor = this.maskTelefone(val)
        this.putObjContato.phone = valor;
      }
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
        this.resetForm();  
      } else if (this.savContato === 'error') {
        this.$swal.fire({
          type: 'error',
          title: 'Erro ao adicionar o contato',
        });
      }
    },

    putContato() {
      if (this.putContato === 'success') {
        this.$swal.fire({
          type: 'success',
          title: 'Contato alterado com sucesso',
        });
        this.getContatos();
        this.resetForm();  
      } else if (this.putContato === 'error') {
        this.$swal.fire({
          type: 'error',
          title: 'Erro ao alterar o contato',
        });
      }
    },
  },
  created() {
    this.getContatos();
    this.getEmpresas();
  },
  methods: {
    ...mapActions("Contato", ["salvarContato"]),
    ...mapActions("Contato", ["getContatos"]),
    ...mapActions("Contato", ["deleteContato"]),
    ...mapActions("Contato", ["getContatoById"]),
    ...mapActions("Contato", ["editarContato"]),
    ...mapActions("Empresa", ["getEmpresas"]),

    maskTelefone (val) {
      let valor = val
      valor = valor.replace(/\D/g,"");
      valor = valor.replace(/^(\d{2})(\d)/g,"($1) $2");
      valor = valor.replace(/(\d)(\d{4})$/,"$1-$2");
      return valor;
    },

    editContato() {       
      let idUser = parseInt(localStorage.getItem('user'));
      let nome = this.getContatoId.name
      let email = this.getContatoId.emails;
      let telefone = this.getContatoId.phones;
      let empresas = this.getContatoId.company.map((element) => {
        return element = {
          company:{
            id:element.company.id, 
            name:element.name === undefined ? element.company.name : element.name
          }
        }
      });
      
      let putId = this.getContatoId.id;
      
      let putObj = {
        id: putId,
        name: nome,
        responsible: {
          id: idUser,
        },
        emails: email,
        phones: telefone,
        employers: empresas,
      }
      this.editarContato(putObj);
      this.showDetails = false;
      this.putDisable = false;
    },

    postContato() {
      if(this.checkForm() == true) {
        let resEmail = this.addContato.emails.map((element) => {
          return element = {address: element}
        });

        let resPhone = this.addContato.phones.map((element) => {
          return element = {number: element}
        });

        let resEmpresa = this.addContato.company.map((element) => {
          return element = { company:{id:element.id}}
        });

        const idUser = window.localStorage.getItem('user');
        let nome = this.objContato.nome;
        let email = resEmail;
        let telefone = resPhone;
        let id = parseInt(idUser);
        let empresas = resEmpresa;
        
        const postObj = {
          name: nome,
          responsible: {
            id: id,
          },
          emails: email,
          phones: telefone,
          employers: empresas
        }
        this.salvarContato(postObj);        
        this.showAddContato = false;
      }
    },
    arrayPutPush(type) {
      if (type == 'phone') {
        if (this.putObjContato.phone.length > 12) {
          let addPhone = this.putObjContato.phone;
          this.getContatoId.phones.push({number: addPhone});
          this.putObjContato.phone = '';
        } else {
          this.$swal.fire({
            title: 'Telefone inválido!',
            type: 'error',
            timer: 1000,
            showConfirmButton: false,
          });
          this.putObjContato.phone = '';
        }
      } 
      else if(type == 'email') {
        if(this.validEmail(this.putObjContato.email)) {
          let addEmail = this.putObjContato.email;
          this.getContatoId.emails.push({address: addEmail});
          this.putObjContato.email = '';          
        } else {
          this.$swal.fire({
            title: 'Email inválido!',
            type: 'error',
            timer: 1000,
            showConfirmButton: false,
          });
          this.putObjContato.email = '';
        }
      }
    },

    arrayPutEmpresa() {
      if (this.putObjContato.company.length == 0) {
        this.$swal.fire({
          title: 'Empresa inválida!',
          type: 'error',
          timer: 1000,
          showConfirmButton: false,
        });
      } else {
        this.getContatoId.company.push(this.putObjContato);
      }
    },

    arrayEmpresa(){
      if (this.objContato.employers.length == 0) {
        this.$swal.fire({
          title: 'Empresa inválida',
          type: 'error',
          timer: 1000,
          showConfirmButton: false,
        });
      } else {
        this.addContato.company.push(this.objContato.employers);
      }
    },

    arrayPush(type) {     
      if (type == 'telefone') {
        if (this.objContato.phone.length > 12) {
          this.addContato.phones.push(this.objContato.phone);
          this.objContato.phone = '';
        } else {
          this.$swal.fire({
            title: 'Telefone inválido!',
            type: 'error',
            timer: 1000,
            showConfirmButton: false,
          });
          this.objContato.phone = '';
        }
      } 
      else if(type == 'email') {
        if(this.validEmail(this.objContato.email)) {
          this.addContato.emails.push(this.objContato.email);
          this.objContato.email = '';
        } else {
          this.$swal.fire({
            title: 'Email inválido!',
            type: 'error',
            timer: 1000,
            showConfirmButton: false,
          });
          this.objContato.email = '';
        }
      }
    },

    contatoId(id) {      
      this.getContatoById(id);
      this.showDetails = true;
    },

    resetForm() {
      this.objContato.nome = '';
      this.objContato.phone = [];
      this.objContato.email = [];
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
    closeModalPut() {
      this.showDetails = false;
      this.putDisable = false;
    },
    closeModalAdd() {
      this.showAddContato = false,
      this.resetForm();
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
.form-modal input, .form-modal select {
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
.span-edit {
  cursor: pointer;
  float: right;
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

@media only screen and (max-width: 768px) {
  .md-layout-item li {
    width: 90%;
  }
  .modal-conteudo {
    min-width: 250px;
    padding: 15px;
  }
  .form-modal input, .form-modal select {
    width: 85%;
  }
}
</style>