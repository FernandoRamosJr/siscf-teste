<template>
  <div class="container">
    <form v-on:keyup.enter="callLogin">
      <div class="card mt-5">
        <form class="card-body">
          <div class="page-header mb-3">
            <h2>Login</h2>
            <hr/>
          </div>

          <div class="row">
            <div class="col-2">
              <div class="form-group">
                <label class="control-label">Login</label>
                <input class="form-control form-control-xs" id="usuario" type="text" size="40" v-model="login"/>
              </div>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-2">
              <div class="form-group">
                <label class="control-label">Senha</label>
                <input class="form-control form-control-xs" id="senha" type="password" size="40" v-model="senha"/>
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-12">
              <hr/>
              <input type="button" class="btn btn-success" value="Entrar" @click="callLogin" />
            </div>
          </div>
        </form>
      </div>
    </form>
  </div>
</template>

<script>

import axios from "../../http-common";
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: "LoginForm",
  data() {
    return {
      login:"",
      senha:""
    };
  },

  methods: {
    callLogin(){
      if(this.login === ""){
        this.$toast.add({severity:'warn', summary: 'Alerta', detail:'O seguinte campo é obrigatório e não foi preenchido: Login', life: 3000});
        return null;
      }

      if(this.senha === ""){
        this.$toast.add({severity:'warn', summary: 'Alerta', detail:'O seguinte campo é obrigatório e não foi preenchido: Senha', life: 3000});
        return null;
      }

      axios
        .post("http://localhost:3004/siscf-api/auth", {
           user:this.login,
            password:this.senha
        })
        .then(response => {
          let retorno = response.data;

            if (retorno === "erro"){
              this.$toast.add({severity:'error', summary: 'Erro', detail:'O usuário ou senha informados estão incorretos.', life: 3000});

            }else{
              const token = retorno.token;
              const userDetails = retorno.userDetails;

              sessionStorage.setItem('token', token);
              sessionStorage.setItem('userDetails', JSON.stringify(userDetails));

              this.$store.dispatch('login');
              if(this.$route.query.redirect) {
                  this.$router.push({ path: this.$route.query.redirect});
              } else {
                  this.$router.push({ name: 'Home'});
              }
            }
        })
        .catch(e => {
          this.$toast.add({severity:'error', summary: 'Erro', detail:'O usuário ou senha informados estão incorretos catch.', life: 3000});
          console.log(e);
        });

    }
  },

  mounted() {
    this.$store.dispatch('atualizarAppAmbiente', "DEVNOVOJAVA");
  },

  setup() {
    const store = useStore();
    const appAmbiente = computed(() => store.state.appAmbiente);
    return {
      appAmbiente
    }
  }
}
</script>
