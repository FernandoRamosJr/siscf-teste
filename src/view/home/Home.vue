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

  /*import axios from "../../http-common";*/
  /*import Panel from 'primevue/panel';*/

  import Menu from '../../components/Menu.vue'

  export default {
  components: {
    Menu
      /*Panel*/
  },
  name: "HomeForm",
  data() {
    return {
      nomeUsuario: "",
    };
  },

  methods: {
    /*trataPermissoes(permissoes){
      if (permissoes!= null){
        if (permissoes.indexOf('Pne') > 0){
          this.$store.dispatch('permitirMenuPne');
        }else{
            this.$store.dispatch('ocultarMenuPne');
        }   
      }
    }*/
  },

  mounted() {
    /*var trensurb_usuario = sessionStorage.getItem("sci-api");
    var token = sessionStorage.getItem("token");*/
    var userDetails = sessionStorage.getItem("userDetails");

    var userObject = JSON.parse(userDetails);

    var idUsuario = userObject.idUsuario;
    var emailUsuario = userObject.emailUsuario;
    this.nomeUsuario = userObject.nomeUsuario;
    var login = userObject.login;


    console.log(idUsuario);
    console.log(emailUsuario);
    console.log(this.nomeUsuario);
    console.log(login);

    this.$store.dispatch('atualizarUsuarioLogado',userDetails);

    /*console.log(trensurb_usuario);
    console.log(token);
    console.log(userDetails);*/

    /*if (trensurb_usuario == null) {

      axios.get("http://localhost:3000/siscf-api/findUsuarioLogado")
        .then(response => {
          var usuario = response.data;
          var jSon_usuario_permissao = JSON.stringify(usuario.permissoes);

          usuario.permissoes = null;

          var jsonUsuario = JSON.stringify(usuario);

          sessionStorage.setItem("trensurb_usuario", jsonUsuario);
          sessionStorage.setItem("trensurb_usuario_permissao", jSon_usuario_permissao);

          this.trataPermissoes(jSon_usuario_permissao);
          this.$store.dispatch('atualizarUsuarioLogado',usuario);
        })
        .catch(e => {
          this.$toast.add({severity:'error', summary: 'Erro', detail:'Erro ao buscar dados do usuário logado.', life: 3000});
          console.log(e);
        });
    }*/
  }
}
</script>

