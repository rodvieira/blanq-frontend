 <template>
  <header class="md-elevation-3">
    <span class="md-display-2">{{title}}</span>
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
  }
}
</script>
 
<style lang="scss" scoped>
@import '../assets/style.scss';
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
</style>
 