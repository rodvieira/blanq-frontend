<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {

    };
  }
};
</script>
<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  input:focus, button:focus {
    outline: none;
  }
  body {
    margin: 0px;
    font-family: 'Roboto', sans-serif !important;
    background-image: linear-gradient(19deg, #21d4fd, #b721ff);
  }
</style>
