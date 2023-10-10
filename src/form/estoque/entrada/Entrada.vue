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

    <Dialog name="buscarProduto" id="buscarProduto" v-model:visible="buscarProduto" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '35vw'}">
      <form>
        <div class="row">
          <div class="col-4">
            <div class="form-group">
              <label for="categoria">Categoria</label>
              <select required class="form-select" v-model="categoriaProdutoModal">
                <option value="">...</option>
                <option v-for="categoria in array_categorias" :key="categoria" :value="categoria">{{ categoria }}</option>
              </select>
            </div>
          </div>

          <div class="col-8">
            <div class="form-group">
              <label for="organizacao">Nome</label>
              <input class="form-control" v-model="nomeProdutoModal" />
              <div class="invalid-feedback"></div>
            </div>
          </div>
        </div>
      </form>

      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" @click="fecharBuscarProduto" class="p-button-danger" />
        <Button label="Confirmar Edição" icon="pi pi-check" @click="confirmarBuscarProduto" class="p-button-primary" />
      </template>
    </Dialog>

    <div class="card mt-5">
      <form class="card-body">
        <div class="page-header mb-3">
          <h2>Entrada de Produtos</h2>
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

          <div class="col-3">
            <div class="form-group">
              <input type="button" class="btn btn-primary mt-4" value="Buscar Produto" @click="buscarProdutoModal" />
            </div>
          </div>

          <div class="col-5">
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
              <input class="form-control" name="nomeProduto" v-model="nomeProduto" readonly/>
            </div>
          </div>

          <div class="col-4">
            <div class="form-group">
              <label for="organizacao">Nome</label>
              <input class="form-control" name="nomeProduto" v-model="nomeProduto" readonly/>
              <div class="invalid-feedback"></div>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <label for="quantidade">Unidade</label>
              <input class="form-control" name="nomeProduto" v-model="nomeProduto" readonly/>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <label for="organizacao">Saldo</label>
              <input class="form-control" v-model="saldo" readonly/>
              <div class="invalid-feedback"></div>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <label for="organizacao">Estoque Min.</label>
              <input class="form-control" v-model="estoqueMinimo" readonly/>
              <div class="invalid-feedback"></div>
            </div>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-2">
            <div class="form-group">
              <label for="categoria">Compra</label>
              <input type="date" class="form-control" name="nomeProduto" v-model="nomeProduto"/>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <label for="organizacao">Fornecedor</label>
              <input class="form-control" name="nomeProduto" v-model="nomeProduto"/>
              <ErrorMessage class="form-required" name="nomeProduto" />
              <div class="invalid-feedback"></div>
            </div>
          </div>

          <div class="col-1">
            <div class="form-group">
              <label for="organizacao">NF</label>
              <input class="form-control" name="nomeProduto" v-model="nomeProduto"/>
              <ErrorMessage class="form-required" name="nomeProduto" />
              <div class="invalid-feedback"></div>
            </div>
          </div>

          <div class="col-1">
            <div class="form-group">
              <label for="organizacao">Lote</label>
              <input class="form-control" name="nomeProduto" v-model="nomeProduto"/>
              <ErrorMessage class="form-required" name="nomeProduto" />
              <div class="invalid-feedback"></div>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <label for="quantidade">Fabricação</label>
              <input type="date" class="form-control" name="nomeProduto" v-model="nomeProduto"/>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <label for="organizacao">Validade</label>
              <input type="date" class="form-control" v-model="saldo" required/>
              <div class="invalid-feedback"></div>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <label for="organizacao">Quantidade Comprada</label>
              <input class="form-control" v-model="estoqueMinimo" required/>
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
import Menu from "@/components/Menu.vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import {carregarListaDeProdutosAutoComplete} from "@/service/produto.service";

export default {
  name: "EntradaEstoqueForm",
  components: {
    Menu,
    Button,
    Dialog
  },
  data() {
    return {
      iniciaProgressBar: false,
      msgBuscarProduto: "",
      buscarProduto: false,
      categoriaProdutoModal: "",
      nomeProdutoModal: "",
      produto: "",
      produtoPayload: {
        idProduto: "",
        categoriaProduto: "",
        quantidadeProduto: "",
        nomeProduto: "",
        cadastro: "",
        saldo: "",
        estoqueMinimo: "",
        observacao: ""
      },
      array_categorias :
          [
            "Insumos",
            "Cosmiatria",
            "Medicamentos",
            "Imunologia",
          ],
    };
  },
  methods: {
    fecharRetornoOperacao() {
      this.retornoOperacao = false;
    },

    fecharBuscarProduto(){
      this.buscarProduto = false;
    },

    confirmarBuscarProduto() {
      this.carregarListaDeProdutosAutoComplete();
      this.buscarProduto = false;
    },

    buscarProdutoModal() {
      this.buscarProduto = true;
    },

    montarPayloadAutoComplete(){
      this.produtoPayload =
          {
            "idProduto": "",
            "categoriaProduto": this.categoriaProdutoModal,
            "quantidadeProduto": "",
            "nomeProduto": this.nomeProdutoModal,
            "cadastro": "",
            "saldo": "",
            "estoqueMinimo": "",
            "observacao": "",
          }
      return {
        ...this.produtoPayload
      }
    },

    async carregarListaDeProdutosAutoComplete() {
      const payload = this.montarPayloadAutoComplete();
      this.iniciaProgressBar = true;

      try {
        const response = await carregarListaDeProdutosAutoComplete(payload);
        this.produto = response;
      } catch (error) {
        this.msgRetornoOperacao = "Erro ao buscar produto.";
      }

      this.iniciaProgressBar = false;
    }
  }
}
</script>