 <template>
  <header class="md-elevation-3">
    <span>{{title}}</span>
    <span @click="logOut()">Sair</span>
  </header>
</template>
 
<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      required: true,
    }
  },

  methods: {
    logOut() {
      localStorage.removeItem('token');
      this.$router.push('/')
    }
  }
}
</script>
 
<style lang="scss" scoped>
@import '../assets/style.scss';
    header {
      width: 100%;
      padding: 1.5%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    header span {
      color: $text-color-white;
      font-size: 22px;
    }
    header span:nth-child(2) {
      font-size: 16px;
      cursor: pointer;
    }
    @media only screen and (max-width: 768px) {
      header {
        padding: 5.5%;
      }
    }
</style>
 