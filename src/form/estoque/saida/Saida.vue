<template>
  <Dialog name="retornoOperacao" id="retornoOperacao" v-model:visible="retornoOperacao" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}">
    <p class="h5" >{{ msgRetornoOperacao }}</p>
    <template #footer>
      <Button label="Fechar" icon="pi pi-times" @click="fecharRetornoOperacao" class="p-button-danger" />
    </template>
  </Dialog>

  <div id="header">
    <Menu/>
  </div>
  <div class="container">
    <h1>Saída</h1>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

export default {
  name: "SaidaEstoqueForm",
  components: {
    Menu,
    Button,
    Dialog
  },

  methods: {
    fecharRetornoOperacao() {
      this.retornoOperacao = false;
    },
  }
}
</script>