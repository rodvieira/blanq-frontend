 <template>
  <div>
    <header class="md-elevation-3">
      <span class="md-display-2">Contato</span>
    </header>
    <div class="rdv-content">
      <div class="rdv-buttons">
        <md-button class="md-dense md-raised md-primary buttons-rdv">Adicionar</md-button>
        <md-button class="md-dense md-raised md-primary buttons-rdv">Empresas</md-button>
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
    </div>
  </div>
</template>
 
<script>
export default {
  name: "contato",
  data() {
    return {};
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
</style>
 