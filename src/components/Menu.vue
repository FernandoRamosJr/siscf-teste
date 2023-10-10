<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <router-link to="/siscf-web/home" class="navbar-brand">
        <span>
          <h5>IMS - IDG</h5>
          <h6>SisCF - Sistema de Controle Financeiro, Cobrança e Estoque.</h6>
        </span>
      </router-link>

      <div class="collapse navbar-collapse justify-content-between mt-4" id="navbarCollapse">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Cadastro
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
              <li>
                <a class="dropdown-item" href="#"  @click="navigateTo('/siscf-web/fornecedor')">Fornecedores</a>
              </li>
              <li>
                <a class="dropdown-item" href="#"  @click="navigateTo('/siscf-web/produto')">Produtos</a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Estoque (Em construção)</a>
          </li>
        </ul>
        <form @submit.prevent="logout" class="navbar-form">
          <button type="submit" class="btn btn-outline-info">
            Sair
          </button>
        </form>
      </div>

      <button class="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#navbar9">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "MenuForm",
    data() {
      return {
        itensMenu: []
      };
    },
  
    methods: {
      /* eslint-disable no-console */
      navigateTo(route) {
        this.$router.push(route); // Navega para a rota desejada
      },

      logout(){
        sessionStorage.removeItem('token');
        this.goToHome();
        sessionStorage.clear();
        this.$store.dispatch('logout');
      },

      goToHome() {
        window.location = "/home";
      },
    }
  }
</script>

<style>
</style>
  