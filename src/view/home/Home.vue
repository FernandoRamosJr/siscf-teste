<template>
  <div id="header">
    <Menu/>
  </div>
  <div class="container">
    <div class="page-header mt-5">
      <h1>Bem vindo(a), {{ this.nomeUsuario }}!</h1>
    </div>
  </div>
</template>

<script>
  import Menu from '../../components/Menu.vue'

export default {
  name: "HomeForm",
  components: {
    Menu
  },

  data() {
    return {
      nomeUsuario: "",
    };
  },

  mounted() {
    const userDetails = sessionStorage.getItem("userDetails");
    const userObject = JSON.parse(userDetails);
    this.nomeUsuario = userObject.nomeUsuario;

    this.$store.dispatch('atualizarUsuarioLogado',userDetails);
  }
}
</script>

