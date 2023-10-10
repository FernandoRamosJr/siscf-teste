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

    <div class="card mt-5">
      <form class="card-body">
        <div class="page-header mb-3">
          <h2>Novo Produto</h2>
          <hr/>
        </div>

        <div class="row">
          <div class="col-2">
            <div class="form-group">
              <label for="id">Código</label>
              <input class="form-control" v-model="idProduto" readonly/>
              <div class="invalid-feedback"></div>
            </div>
          </div>

          <div class="col-8">
            <div class="form-group"></div>
          </div>

          <div class="col-2 float-end">
            <div class="form-group">
              <label for="organizacao">Data de Cadastro</label>
              <input class="form-control" v-model="cadastro" readonly/>
              <div class="invalid-feedback"></div>
            </div>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-2">
            <div class="form-group">
              <label for="categoria">Categoria</label>
              <select required class="form-select" v-model="categoriaProduto">
                <option value="">...</option>
                <option v-for="categoria in array_categorias" :key="categoria" :value="categoria">{{ categoria }}</option>
              </select>
            </div>
          </div>

          <div class="col-3">
            <div class="form-group">
              <label for="organizacao">Nome</label>
              <Field class="form-control" name="nomeProduto" v-model="nomeProduto"/>
              <ErrorMessage class="form-required" name="nomeProduto" />
              <div class="invalid-feedback"></div>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <label for="quantidade">Quantidade</label>
              <select required class="form-select" v-model="quantidadeProduto">
                <option value="">...</option>
                <option v-for="quantidade in array_quantidades" :key="quantidade" :value="quantidade">{{ quantidade }}</option>
              </select>
            </div>
          </div>

          <div class="col-1">
            <div class="form-group">
              <label for="organizacao">Saldo</label>
              <input class="form-control" v-model="saldo" required/>
              <div class="invalid-feedback"></div>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <label for="organizacao">Estoque Min.</label>
              <input class="form-control" v-model="estoqueMinimo" required/>
              <div class="invalid-feedback"></div>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <label for="organizacao">Observação</label>
              <input class="form-control" v-model="observacao" required/>
              <div class="invalid-feedback"></div>
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-12">
            <hr/>
            <router-link to="/produto" class="btn btn-danger" style="margin-right: 10px">Cancelar</router-link>
            <input type="button" class="btn btn-success" value="Salvar" @click="produtoSalvar">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Menu from '../../components/Menu.vue'
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ProgressBar from 'primevue/progressbar';

import { Field, ErrorMessage } from "vee-validate";

import {produtoSalvar} from "@/service/produto.service";
export default {
  name: "NovoProdutoForm",
  components: {
    Menu,
    Button,
    Dialog,
    ProgressBar,
    Field,
    ErrorMessage
  },
  data() {
    return {
      iniciaProgressBar: false,
      msgRetornoOperacao: "",
      retornoOperacao: false,
      produto: "",
      idProduto: "",
      cadastro: "",
      nomeProduto: "",
      saldo: "",
      estoqueMinimo: "",
      observacao: "",
      produtoModel: {},
      array_categorias :
      [
        "Insumos",
        "Cosmiatria",
        "Medicamentos",
        "Imunologia",
      ],
      array_quantidades :
      [
        "Unidade(s)",
        "Caixa(s)",
        "Quilo(s)",
        "Pacote(s)",
        "Litro(s)",
        "Mililitro(s)",
        "Rolo(s)",
        "Frasco(s)",
      ],
    };
  },
  methods: {
    isRequired(value) {
      if (value && value.trim()) {
        return true;
      }
      return 'This is required';
    },

    fecharRetornoOperacao(){
      this.retornoOperacao = false;
    },

    formatarData(dataNoFormatoOriginal) {
      const data = new Date(dataNoFormatoOriginal);
      const dia = data.getDate().toString().padStart(2, '0');
      const mes = (data.getMonth() + 1).toString().padStart(2, '0');
      const ano = data.getFullYear();
      return `${dia}/${mes}/${ano}`;
    },

    montarProdutoModelSalvar(){
      this.produtoModel =
          {
            "idProduto": this.idProduto,
            "categoriaProduto": this.categoriaProduto,
            "quantidadeProduto": this.quantidadeProduto,
            "nomeProduto": this.nomeProduto,
            "cadastro": this.cadastro,
            "saldo": this.saldo,
            "estoqueMinimo": this.estoqueMinimo,
            "observacao": this.observacao,
          }
      return {
        ...this.produtoModel
      }
    },

    async produtoSalvar() {
      const payload = this.montarProdutoModelSalvar();
      console.log(payload)
      this.iniciaProgressBar = true;

      try {
        const response = await produtoSalvar(payload, this.$toast);
        if (response.mensagem === "PRODUTO CRIADO COM SUCESSO.") {
          this.produto = response;
          await this.retornaHome();
        } else {
          this.msgRetornoOperacao = this.produto.mensagem;
          this.retornoOperacao = true;
        }
      } catch (error) {
        this.msgRetornoOperacao = "Erro ao editar produto.";
      }

      this.iniciaProgressBar = false;
    },

    async retornaHome() {
      this.msgRetornoOperacao = this.produto.mensagem;
      this.retornoOperacao = true;
      this.$router.push({ name: 'produto' });
    },
  },
}
</script>
