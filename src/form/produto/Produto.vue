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
    <Dialog  v-model:visible="this.iniciaProgressBar" :style="{width: '50vw'}" :modal="true" :closeOnEscape="false" :closable="false" :showHeader="true">
      <ProgressBar mode="indeterminate" style="height: .5em"/>
    </Dialog>

    <Dialog name="confirmaExcluir" id="confirmaExcluir" v-model:visible="confirmaExcluir" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}">
      <p class="h5" >{{ msgConfirmaExcluir }}</p>
      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" @click="fecharConfirmaExcluir" class="p-button-warning" />
        <Button label="Excluir" icon="pi pi-times" @click="excluirProduto" class="p-button-danger" />
      </template>
    </Dialog>

    <div class="card mt-5">
      <div class="card-body">
        <div class="page-header mb-3">
          <h2>Lista de Produtos</h2>
          <hr/>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <table class="table table-hover">
                <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome</th>
                  <th>Cadastro</th>
                  <th>Saldo</th>
                  <th>Estoque Min.</th>
                  <th>Observação</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(produto) in listaProdutos" :key="produto.id">
                  <td>{{produto.idProduto}}</td>
                  <td>{{produto.nomeProduto}}</td>
                  <td>{{new Date(produto.cadastro).toLocaleDateString("pt-BR")}}</td>
                  <td>{{produto.saldo}}</td>
                  <td>{{produto.estoqueMinimo}}</td>
                  <td>{{produto.observacao}}</td>
                  <td v-if='listaProdutos != ""'>
                    <input type="button" class="btn btn-primary" style="margin-right: 10px" value="Editar" @click="editarProduto(produto.idProduto)"/>
                    <input type="button" class="btn btn-danger" value="Excluir" @click="confirmaExcluirProduto(produto.idProduto)"/>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-12">
            <hr/>
            <router-link to="/home" class="btn btn-primary" style="margin-right: 10px">Voltar</router-link>
            <router-link to="novoProduto" class="btn btn-success">Novo Produto</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '../../components/Menu.vue'
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ProgressBar from 'primevue/progressbar';
import {carregarListaDeProdutos, excluirProduto} from "@/service/produto.service";
export default {
  name: "ProdutoForm",
  components: {
    Menu,
    Button,
    Dialog,
    ProgressBar
  },
  data() {
    return {
      iniciaProgressBar: false,
      confirmaExcluir: false,
      msgConfirmaExcluir: "",
      msgRetornoOperacao: "",
      retornoOperacao: false,
      listaProdutos:"",
      produto:"",
      idProdutoExcluir: "",
    };
  },
  methods: {
    fecharRetornoOperacao(){
      this.retornoOperacao = false;
    },

    fecharConfirmaExcluir(){
      this.idProdutoExcluir = "";
      this.confirmaExcluir = false;
    },

    confirmaExcluirProduto(id) {
      this.idProdutoExcluir = id;
      this.msgConfirmaExcluir = "Deseja excluir o produto?";
      this.confirmaExcluir = true;
    },

    async carregarListaDeProdutos() {
      try {
        this.listaProdutos = await carregarListaDeProdutos(this.$toast);
      } catch (error) {
        console.error(error);
      }
    },

    async excluirProduto() {
      this.confirmaExcluir = false;
      this.iniciaProgressBar = true;

      try {
        this.mensagem = await excluirProduto(this.idProdutoExcluir, this.$toast);
        this.msgRetornoOperacao = this.mensagem;
        this.retornoOperacao = true;
      } catch (error) {
        this.msgRetornoOperacao = this.mensagem;
        this.retornoOperacao = true;
      }

      this.iniciaProgressBar = false;
      this.carregarListaDeProdutos();
    },

    async editarProduto(idProduto) {
      console.log(idProduto);
      this.$router.push({ name: 'editarProduto', params: { id: idProduto } });
    },
  },
  mounted() {
    this.carregarListaDeProdutos();
  },
}
</script>
