<template>
  <body>
    <div id="app">
      <div class="container">
        <router-view />
        <Rodape/>
      </div>
    </div>
  </body>
</template>

<style scoped>
@import "./assets/styles/gxt-all.css";
@import "./assets/styles/GWT_Main.css";
@import "./assets/styles/gxt-gray.css";
@import "./assets/styles/theme.css";
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css";
</style>

<script>
import Rodape from './components/Rodape.vue';
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'App',
  components: {
    Rodape
  },

  data() {
    return {
      nomeUsuario: "",
    };
  },

  methods:{
    isAuthenticated() {
      return sessionStorage.getItem('token') !== null;
    }
  },

  setup () {
    const store = useStore()
    const appAmbiente = computed(() => store.state.appAmbiente);
    const logado = computed(() => store.state.isLogged)
    store.dispatch('logout');
    return {
      logado,
      appAmbiente
    }
  },

  mounted() {
    this.isAuthenticated();
  },
}
</script>
