<template>
  <div>
    <!-- Add empresa -->
    <section>
      <md-dialog :md-active.sync="showAddEmpresa">
        <md-dialog-title>Novo empresa</md-dialog-title>
        <div class="modal-conteudo">
          <div class="form-modal">
            <label for="nome">Nome</label>
            <input v-model="objEmpresa.nome" type="text" placeholder="Ex: Tesla Motors">
          </div>
          <div class="form-modal">
            <label for="dominio">Dominio</label>
            <input v-model="objEmpresa.dominio" type="text" placeholder="Ex: www.dominio.com">
          </div>

          <div class="form-modal">
            <label for="telefone">Telefone</label>
            <input v-model="objEmpresa.phone" type="text" placeholder="Ex: (00)00000-0000" maxlength="15">
            <span @click="arrayPush('telefone')">
              <i class="fas fa-plus-circle"></i> 
            </span>
            <span class="tags-empresa" v-for="(telefone, index) in addEmpresa.phones" :key="index">{{telefone}} <span @click="addEmpresa.phones.splice(index, 1)">x</span></span>
          </div>

          <div class="form-modal">
            <label for="email">E-mail</label>
            <input v-model="objEmpresa.email" type="text" placeholder="Ex: johndoe@mail.com">
            <span @click="arrayPush('email')">
              <i class="fas fa-plus-circle"></i> 
            </span>
            <span class="tags-empresa" v-for="(email, index) in addEmpresa.emails" :key="index">{{email}} <span @click="addEmpresa.emails.splice(index, 1)">x</span></span>
          </div>
        </div>
        <md-dialog-actions>
          <md-button class="md-primary modal-btn" @click="closeModalAdd()">Close</md-button>
          <md-button class="md-primary modal-btn" @click="postEmpresa()"> Save </md-button>
        </md-dialog-actions>
      </md-dialog>
    </section>
    <!-- / Add empresa -->
    <!-- Detalhes contato -->
    <!-- <div>
      <md-dialog :md-active.sync="showDetails">
        <md-dialog-title>
          Detalhes do Contato
          <span class="span-edit" @click="putDisable = false">
            <i class="fas fa-edit"></i>
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
            </span>
            <span class="tags-contato" v-for="(email, index) in getContatoId.emails" :key="email.id" >
              {{email.address}} 
              <span v-if="!putDisable" @click="getContatoId.emails.splice(index, 1)">x</span>
            </span>
          </div>
        </div>
        <md-dialog-actions>
          <md-button class="md-primary modal-btn" @click="showDetails = false">Close</md-button>
          <md-button class="md-primary modal-btn" @click="editContato()"> Save </md-button>
        </md-dialog-actions>
      </md-dialog>
    </div> -->
    <!-- / Detalhes contato -->

    <Header title="Empresas" />

    <section class="rdv-content">
      <div class="rdv-buttons">
        <router-link to="/contato">
          <md-button class="md-dense md-raised md-primary buttons-rdv">
            <i class="fas fa-users"></i>
            Contatos</md-button>
        </router-link>
        <md-button
          class="md-dense md-raised md-primary buttons-rdv"
          @click="showAddEmpresa = true"
        >
        <i class="fas fa-plus-circle"></i>  
        Adicionar</md-button>
      </div>
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <ul>
            <li class="md-elevation-2" v-for="empresa in getEmpresa" :key="empresa.id">
              <span class="md-subheading">{{empresa.name}}</span>
              <div class="icons-list">
                <span @click="empresaId(empresa.id)">
                  <i class="fas fa-info-circle"></i>
                </span>
                <span @click="deleteEmpresa(empresa.id)">
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
      showAddEmpresa: false,   
      responsible: null,
      objEmpresa: {
        nome:'',
        dominio: '',
        email: [],
        phone: [],
        contatosRelacionados:[],
      },
      putDisable: true,
      putObjContato: {
        nome: '',
        email: [],
        phone: [],
      }
    };
  },

  computed: {
    ...mapState("Empresa", ["addEmpresa"]),
    ...mapState("Empresa", ["getEmpresa"]),
    // ...mapState("Empresa", ["getEmpresaId"]),
    ...mapState("Empresa", ["delEmpresa"]),
    ...mapState("Empresa", ["savEmpresa"]),
    // ...mapState("Empresa", ["putEmpresa"]),
  },
  watch: {
  //   'objContato.phone'(val){
  //     if(this.objContato.phone.length > 0) {
  //       let valor = this.maskTelefone(val)
  //       this.objContato.phone = valor;
  //     }
  //   },
  //   'putObjContato.phone'(val){
  //     if(this.putObjContato.phone.length > 0) {
  //       let valor = this.maskTelefone(val)
  //       this.putObjContato.phone = valor;
  //     }
  //   },
    delEmpresa() {
      if (this.delEmpresa === 'success') {
        this.$swal.fire({
          type: 'success',
          title: 'Empresa excluido com sucesso',
        });
        this.getEmpresas();        
      } else if (this.delEmpresa === 'error') {
        this.$swal.fire({
          type: 'error',
          title: 'Erro ao excluir o Empresa',
        });
      }
    },
    savEmpresa(){
      if (this.savEmpresa === 'success') {
        this.$swal.fire({
          type: 'success',
          title: 'Empresa adicionado com sucesso',
        });
        this.getEmpresas();
        this.resetForm();  
      } else if (this.savEmpresa === 'error') {
        this.$swal.fire({
          type: 'error',
          title: 'Erro ao adicionar o Empresa',
        });
      }
    },

  //   putContato() {
  //     if (this.putContato === 'success') {
  //       this.$swal.fire({
  //         type: 'success',
  //         title: 'Contato alterado com sucesso',
  //       });
  //       this.getContatos();
  //       this.resetForm();  
  //     } else if (this.putContato === 'error') {
  //       this.$swal.fire({
  //         type: 'error',
  //         title: 'Erro ao alterar o contato',
  //       });
  //     }
  //   },
  },
  created() {
    this.getEmpresas();
  },
  methods: {
    ...mapActions("Empresa", ["salvarEmpresa"]),
    ...mapActions("Empresa", ["getEmpresas"]),
    ...mapActions("Empresa", ["deleteEmpresa"]),
    // ...mapActions("Empresa", ["getEmpresaById"]),
    // ...mapActions("Empresa", ["editarEmpresa"]),

  //   maskTelefone (val) {
  //     let valor = val
  //     valor = valor.replace(/\D/g,"");
  //     valor = valor.replace(/^(\d{2})(\d)/g,"($1) $2");
  //     valor = valor.replace(/(\d)(\d{4})$/,"$1-$2");
  //     return valor;
  //   },

  //   editContato() {       
  //     let idUser = parseInt(localStorage.getItem('user'));
  //     let nome = this.getContatoId.name
  //     let email = this.getContatoId.emails;
  //     let telefone = this.getContatoId.phones;
  //     let putId = this.getContatoId.id;
      
  //     let putObj = {
  //       id: putId,
  //       name: nome,
  //       responsible: {
  //         id: idUser,
  //       },
  //       emails: email,
  //       phones: telefone,
  //     }
  //     this.editarContato(putObj);
  //     this.showDetails = false;
  //   },

    postEmpresa() {
      if(this.checkForm() == true) {
        let resEmail = this.addEmpresa.emails.map((element) => {
          return element = {address: element}
        });

        let resPhone = this.addEmpresa.phones.map((element) => {
          return element = {number: element}
        });

        const idUser = window.localStorage.getItem('user');
        let nome = this.objEmpresa.nome;
        let dominio = this.objEmpresa.dominio
        let email = resEmail;
        let telefone = resPhone;
        let id = parseInt(idUser)
        
        const postObj = {
          name: nome,
          domain: dominio,
          responsible: {
            id: id,
          },
          emails: email,
          phones: telefone,
        }
        this.salvarEmpresa(postObj);        
        this.showAddEmpresa = false;
      }
    },
  //   arrayPutPush(type) {
  //     if (type == 'phone') {
  //       if (this.putObjContato.phone.length > 12) {
  //         let addPhone = this.putObjContato.phone;
  //         this.getContatoId.phones.push({number: addPhone});
  //         this.putObjContato.phone = '';
  //       } else {
  //         this.$swal.fire({
  //           title: 'Telefone inválido!',
  //           type: 'error',
  //           timer: 1000,
  //           showConfirmButton: false,
  //         });
  //         this.putObjContato.phone = '';
  //       }
  //     } 
  //     else if(type == 'email') {
  //       if(this.validEmail(this.putObjContato.email)) {
  //         let addEmail = this.putObjContato.email;
  //         this.getContatoId.emails.push({address: addEmail});
  //         this.putObjContato.email = '';          
  //       } else {
  //         this.$swal.fire({
  //           title: 'Email inválido!',
  //           type: 'error',
  //           timer: 1000,
  //           showConfirmButton: false,
  //         });
  //         this.putObjContato.email = '';
  //       }
  //     }
  //   },
    arrayPush(type) {     
      if (type == 'telefone') {
        if (this.objEmpresa.phone.length > 12) {
          this.addEmpresa.phones.push(this.objEmpresa.phone);
          this.objEmpresa.phone = '';
        } else {
          this.$swal.fire({
            title: 'Telefone inválido!',
            type: 'error',
            timer: 1000,
            showConfirmButton: false,
          });
          this.objEmpresa.phone = '';
        }
      } 
      else if(type == 'email') {
        if(this.validEmail(this.objEmpresa.email)) {
          this.addEmpresa.emails.push(this.objEmpresa.email);
          this.objEmpresa.email = '';
        } else {
          this.$swal.fire({
            title: 'Email inválido!',
            type: 'error',
            timer: 1000,
            showConfirmButton: false,
          });
          this.objEmpresa.email = '';
        }
      }
    },

  //   contatoId(id) {      
  //     this.getContatoById(id);
  //     this.showDetails = true;
  //   },

    resetForm() {
      this.objEmpresa.nome = '';
      this.objEmpresa.phone = [];
      this.objEmpresa.email = [];
    },

    checkForm() {
      if (this.objEmpresa.nome.length <= 0) {
        alert('O nome é obrigatório.');
      }
      else if (this.addEmpresa.phones.length <= 0) {
        alert('O telefone é obrigatório.');
      }
      else if (this.addEmpresa.emails.length <= 0) {        
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

    closeModalAdd() {
      this.showAddEmpresa = false,
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
.tags-empresa {
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
</style>