 <template>
  <div>
    <header class="md-elevation-3">
      <span class="md-display-2">Empresas</span>
    </header>
    <section class="rdv-content">
      <div class="rdv-buttons">
        <router-link to="/contato">
          <md-button class="md-dense md-raised md-primary buttons-rdv">Contatos</md-button>
        </router-link>
        <md-button
          class="md-dense md-raised md-primary buttons-rdv"
          @click="showDialog = true"
        >Adicionar</md-button>
      </div>
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <ul>
            <li class="md-elevation-2">
              <span class="md-subheading">Joao Ribeiro Souza</span>
              <span>DETALHES</span>
            </li>
            <li class="md-elevation-2">
              <span class="md-subheading">Luis Rocha Barbosa</span>
              <span>DETALHES</span>
            </li>
            <li class="md-elevation-2">
              <span class="md-subheading">João Cavalcanti Azevedo</span>
              <span>DETALHES</span>
            </li>
            <li class="md-elevation-2">
              <span class="md-subheading">Paulo Rocha Sousa</span>
              <span>DETALHES</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section>
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Novo contato</md-dialog-title>
        <div class="modal-conteudo">
          <div class="form-modal">
            <label for="nome">Nome</label>
            <input type="text">
          </div>
          <div class="form-modal">
            <label for="dominios">Dominios</label>
            <input type="text">
          </div>
          <div class="form-modal">
            <label for="telefone">Telefone</label>
            <input type="text">
            <span>+</span>
          </div>
          <div class="form-modal">
            <label for="email">E-mail</label>
            <input type="text">
            <span>+</span>
          </div>
          <div class="form-modal">
            <label for="empresas">Empresas relacionadas</label>
            <input type="text">
            <span>+</span>
          </div>
        </div>
        <md-dialog-actions>
          <md-button class="md-primary modal-btn" @click="showDialog = false">Close</md-button>
          <md-button class="md-primary modal-btn" @click="showDialog = false">Save</md-button>
        </md-dialog-actions>
      </md-dialog>
    </section>
  </div>
</template>
 
<script>
export default {
  name: "contato",
  data() {
    return {
      showDialog: false
    };
  }
};
</script>
 
<style lang="scss" scoped>
// variaveis

$marginbt-default: 10px;
$padding-default: 10px;
$radius-default: 10px;
$text-color-grey: #666;
$text-color-white: #fff;
$background-color-default: #fff;

// -----
header {
  height: 20vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
header span {
  color: $text-color-white;
}
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
}
.md-layout-item li span {
  color: $text-color-grey;
}
.md-layout-item li span:nth-of-type(2) {
  float: right;
  cursor: pointer;
}
//Modal
.md-dialog {
  background-color: $background-color-default;
  border-radius: $radius-default;
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
  border: 1px solid rgba(0, 0, 0, 0.3);
}
.form-modal span {
  cursor: pointer;
}
.modal-btn {
  background-color: #dcdcdc;
  color: #666;
}
</style>
 