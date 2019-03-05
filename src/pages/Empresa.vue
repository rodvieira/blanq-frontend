<template>
  <div>
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
    <!-- Add empresa -->
    <section>
      <md-dialog :md-active.sync="showAddEmpresa">
        <md-dialog-title>Nova empresa</md-dialog-title>
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
              <md-tooltip md-direction="bottom">Adicionar</md-tooltip>
            </span>
            <span class="tags-empresa" v-for="(telefone, index) in addEmpresa.phones" :key="index">{{telefone}} <span @click="addEmpresa.phones.splice(index, 1)">x</span></span>
          </div>

          <div class="form-modal">
            <label for="email">E-mail</label>
            <input v-model="objEmpresa.email" type="text" placeholder="Ex: johndoe@mail.com">
            <span @click="arrayPush('email')">
              <i class="fas fa-plus-circle"></i>
              <md-tooltip md-direction="bottom">Adicionar</md-tooltip>
            </span>
            <span class="tags-empresa" v-for="(email, index) in addEmpresa.emails" :key="index">{{email}} <span @click="addEmpresa.emails.splice(index, 1)">x</span></span>
          </div>

          <div class="form-modal">
            <label for="Contato"> Contatos Relacionados</label>
            <select v-model="objEmpresa.contact" @click="arrayContato()">
              <option v-for="contato in getContato" :value="contato" :key="contato.id">
                {{contato.name}}
              </option>
            </select>
            <span class="tags-empresa" v-for="(contato, index) in addEmpresa.contact" :key="index">
              {{contato.name}} 
              <span @click="addEmpresa.contact.splice(index, 1)">x</span>
            </span>
          </div>
        </div>
        <md-dialog-actions>
          <md-button class="md-primary modal-btn" @click="closeModalAdd()">Close</md-button>
          <md-button class="md-primary modal-btn" @click="postEmpresa()"> Save </md-button>
        </md-dialog-actions>
      </md-dialog>
    </section>
    <!-- / Add empresa -->
    <!-- Detalhes empresa -->
    <div>
      <md-dialog :md-active.sync="showDetails">
        <md-dialog-title>
          Detalhes da empresa
          <span class="span-edit" @click="putDisable = false">
            <i class="fas fa-edit"></i>
            <md-tooltip md-direction="bottom">Editar</md-tooltip>
          </span>
        </md-dialog-title>
        
        <div class="modal-conteudo">
          <div class="form-modal">
            <label for="nome">Nome</label>
            <input type="text" v-model="getEmpresaId.name" :disabled="putDisable">
          </div>
          <div class="form-modal">
            <label for="dominio">Dominio</label>
            <input v-model="getEmpresaId.dominio" type="text" placeholder="Ex: www.dominio.com">
          </div>

          <div class="form-modal">
            <label for="telefone">Telefone</label>
            <input type="text" maxlength="15" @keyup.enter="arrayPutPush('phone')" v-model="putObjEmpresa.phone" :disabled="putDisable">
            <span @click="arrayPutPush('phone')">
              <i class="fas fa-plus-circle"></i>
              <md-tooltip md-direction="bottom">Adicionar</md-tooltip>
            </span>
            <span class="tags-empresa" v-for="(telefone, index) in getEmpresaId.phones" :key="telefone.id">
              {{telefone.number}} 
              <span v-if="!putDisable" @click="getEmpresaId.phones.splice(index, 1)">x</span>
            </span>
          </div>

          <div class="form-modal">
            <label for="email">E-mail</label>
            <input type="text" v-model="putObjEmpresa.email" :disabled="putDisable">
            <span @click="arrayPutPush('email')">
              <i class="fas fa-plus-circle"></i>
              <md-tooltip md-direction="bottom">Adicionar</md-tooltip>
            </span>
            <span class="tags-empresa" v-for="(email, index) in getEmpresaId.emails" :key="email.id" >
              {{email.address}} 
              <span v-if="!putDisable" @click="getEmpresaId.emails.splice(index, 1)">x</span>
            </span>
          </div>

          <div class="form-modal">
            <label for="Empresa">Contatos Relacionados</label>
            <select v-model="putObjEmpresa.contact" @click="arrayPutContato()" :disabled="putDisable">
              <option v-for="contato in getContato" :value="contato" :key="contato.id">
                {{contato.name}}
              </option>
            </select>
            <span class="tags-empresa" v-for="(contato, index) in getEmpresaId.contact" v-if="contato.contact == null" :key="index">
              {{contato.name}}
              <span v-if="!putDisable" @click="getEmpresaId.contact.splice(index, 1)">x</span>
            </span>
            <span class="tags-empresa" v-for="(contato, index) in getEmpresaId.contact" v-if="contato.contact != null" :key="index">
              {{contato.contact.name}}
              <span v-if="!putDisable" @click="getEmpresaId.contact.splice(index, 1)">x</span>
            </span>
          </div>
        </div>
        <md-dialog-actions>
          <md-button class="md-primary modal-btn" @click="showDetails = false">Close</md-button>
          <md-button class="md-primary modal-btn" @click="editEmpresa()"> Save </md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
    <!-- / Detalhes empresa -->

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
                  <md-tooltip md-direction="bottom">Detalhes</md-tooltip>
                </span>
                <span @click="deleteEmpresa(empresa.id)">
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
      showAddEmpresa: false,   
      responsible: null,
      objEmpresa: {
        nome:'',
        dominio: '',
        email: [],
        phone: [],
        contact:[],
      },
      putDisable: true,
      putObjEmpresa: {
        nome: '',
        dominio: '',
        email: [],
        phone: [],
        contact:[],
      },
    };
  },

  computed: {
    ...mapState("Empresa", ["addEmpresa"]),
    ...mapState("Empresa", ["getEmpresa"]),
    ...mapState("Empresa", ["getEmpresaId"]),
    ...mapState("Empresa", ["delEmpresa"]),
    ...mapState("Empresa", ["savEmpresa"]),
    ...mapState("Empresa", ["putEmpresa"]),
    ...mapState("Contato", ["getContato"]),
  },
  watch: {
    'objEmpresa.phone'(val){
      if(this.objEmpresa.phone.length > 0) {
        let valor = this.maskTelefone(val)
        this.objEmpresa.phone = valor;
      }
    },
    'putObjEmpresa.phone'(val){
      if(this.putObjEmpresa.phone.length > 0) {
        let valor = this.maskTelefone(val)
        this.putObjEmpresa.phone = valor;
      }
    },
    delEmpresa() {
      if (this.delEmpresa === 'success') {
        this.$swal.fire({
          type: 'success',
          title: 'Empresa excluida com sucesso',
        });
        this.getEmpresas();
        this.resetMsg();
      } else if (this.delEmpresa === 'error') {
        this.$swal.fire({
          type: 'error',
          title: 'Erro ao excluir a Empresa',
        });
      }
    },
    savEmpresa(){
      if (this.savEmpresa === 'success') {
        this.$swal.fire({
          type: 'success',
          title: 'Empresa adicionada com sucesso',
        });
        this.getEmpresas();
        this.resetForm();
        this.resetMsg();
      } else if (this.savEmpresa === 'error') {
        this.$swal.fire({
          type: 'error',
          title: 'Erro ao adicionar a Empresa',
        });
      }
    },

    putEmpresa() {
      if (this.putEmpresa === 'success') {
        this.$swal.fire({
          type: 'success',
          title: 'Empresa alterada com sucesso',
        });
        this.getEmpresas();
        this.resetForm();
        this.resetMsg();
      } else if (this.putEmpresa === 'error') {
        this.$swal.fire({
          type: 'error',
          title: 'Erro ao alterar a empresa',
        });
      }
    },
  },
  created() {
    this.getEmpresas();
    this.getContatos();
  },
  methods: {
    ...mapActions("Empresa", ["salvarEmpresa"]),
    ...mapActions("Empresa", ["getEmpresas"]),
    ...mapActions("Empresa", ["deleteEmpresa"]),
    ...mapActions("Empresa", ["getEmpresaById"]),
    ...mapActions("Empresa", ["editarEmpresa"]),
    ...mapActions("Empresa", ["resetMsg"]),
    ...mapActions("Contato", ["getContatos"]),

    maskTelefone (val) {
      let valor = val
      valor = valor.replace(/\D/g,"");
      valor = valor.replace(/^(\d{2})(\d)/g,"($1) $2");
      valor = valor.replace(/(\d)(\d{4})$/,"$1-$2");
      return valor;
    },

    editEmpresa() {       
      let idUser = parseInt(localStorage.getItem('user'));
      let nome = this.getEmpresaId.name
      let email = this.getEmpresaId.emails;
      let telefone = this.getEmpresaId.phones;
      let contatos = this.getEmpresaId.contact.map((element) => {
        return element = {
          contact:{
            id:element.contact.id , 
            name:element.name === undefined ? element.contact.name : element.name
          }
        }
      });
      let putId = this.getEmpresaId.id;
      let putObj = {
        id: putId,
        name: nome,
        responsible: {
          id: idUser,
        },
        emails: email,
        phones: telefone,
        employees: contatos,
      }
      this.editarEmpresa(putObj);
      this.showDetails = false;
      this.putDisable = false;
    },

    postEmpresa() {
      if(this.checkForm() == true) {
        let resEmail = this.addEmpresa.emails.map((element) => {
          return element = {address: element}
        });

        let resPhone = this.addEmpresa.phones.map((element) => {
          return element = {number: element}
        });

        let resContato = this.addEmpresa.contact.map((element) => {
          return element = { contact:{id:element.id}}
        });

        const idUser = window.localStorage.getItem('user');
        let nome = this.objEmpresa.nome;
        let dominio = this.objEmpresa.dominio
        let email = resEmail;
        let telefone = resPhone;
        let contatos = resContato;
        let id = parseInt(idUser);

        const postObj = {
          name: nome,
          domain: dominio,
          responsible: {
            id: id,
          },
          emails: email,
          phones: telefone,
          employees: contatos,
        }
        this.salvarEmpresa(postObj);        
        this.showAddEmpresa = false;
        this.resetForm();
      }
    },
    arrayPutPush(type) {
      if (type == 'phone') {
        if (this.putObjEmpresa.phone.length > 12) {
          let addPhone = this.putObjEmpresa.phone;
          this.getEmpresaId.phones.push({number: addPhone});
          this.putObjEmpresa.phone = '';
        } else {
          this.$swal.fire({
            title: 'Telefone inválido!',
            type: 'error',
            timer: 1000,
            showConfirmButton: false,
          });
          this.putObjEmpresa.phone = '';
        }
      } 
      else if(type == 'email') {
        if(this.validEmail(this.putObjEmpresa.email)) {
          let addEmail = this.putObjEmpresa.email;
          this.getEmpresaId.emails.push({address: addEmail});
          this.putObjEmpresa.email = '';          
        } else {
          this.$swal.fire({
            title: 'Email inválido!',
            type: 'error',
            timer: 1000,
            showConfirmButton: false,
          });
          this.putObjEmpresa.email = '';
        }
      }
    },
    arrayPutContato() {
      if (this.putObjEmpresa.contact.length == 0) {
        this.$swal.fire({
          title: 'Contato inválido!',
          type: 'error',
          timer: 1000,
          showConfirmButton: false,
        });
      } else {
        this.getEmpresaId.contact.push(this.putObjEmpresa);             
      }
    },
    arrayContato(){
      if (this.objEmpresa.contact.length == 0) {
        this.$swal.fire({
          title: 'Contato inválido!',
          type: 'error',
          timer: 1000,
          showConfirmButton: false,
        });
      } else {
        this.addEmpresa.contact.push(this.objEmpresa.contact);
      }
    },
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

    empresaId(id) {      
      this.getEmpresaById(id);
      this.showDetails = true;
    },
    resetForm() {
      this.objEmpresa.nome = '';
      this.objEmpresa.dominio = '';
      this.objEmpresa.phone = [];
      this.objEmpresa.email = [];
      this.addEmpresa.phones = [];
      this.addEmpresa.emails = [];
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
      this.putDisable = false;
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