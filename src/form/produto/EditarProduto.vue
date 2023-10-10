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
          <h2>Editar Produto</h2>
          <hr/>
        </div>

        <div class="row">
          <div class="col-2">
            <div class="form-group">
              <label for="id">Código</label>
              <input class="form-control" v-model="this.produto.idProduto" readonly/>
              <div class="invalid-feedback"></div>
            </div>
          </div>

          <div class="col-8">
            <div class="form-group"></div>
          </div>

          <div class="col-2 float-end">
            <div class="form-group">
              <label for="organizacao">Data de Cadastro</label>
              <input class="form-control" :value="formatarData(produto.cadastro)" readonly/>
              <div class="invalid-feedback"></div>
            </div>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-2">
            <div class="form-group">
              <label for="categoria">Categoria</label>
              <select required class="form-select" v-model="produto.categoriaProduto">
                <option value="">...</option>
                <option v-for="categoria in array_categorias" :key="categoria" :value="categoria">{{ categoria }}</option>
              </select>
            </div>
          </div>

          <div class="col-3">
            <div class="form-group">
              <label for="organizacao">Nome</label>
              <input class="form-control" v-model="this.produto.nomeProduto" required/>
              <div class="invalid-feedback"></div>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <label for="quantidade">Quantidade</label>
              <select required class="form-select" v-model="produto.quantidadeProduto">
                <option value="">...</option>
                <option v-for="quantidade in array_quantidades" :key="quantidade" :value="quantidade">{{ quantidade }}</option>
              </select>
            </div>
          </div>

          <div class="col-1">
            <div class="form-group">
              <label for="organizacao">Saldo</label>
              <input class="form-control" v-model="this.produto.saldo" required/>
              <div class="invalid-feedback"></div>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <label for="organizacao">Estoque Min.</label>
              <input class="form-control" v-model="this.produto.estoqueMinimo" required/>
              <div class="invalid-feedback"></div>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <label for="organizacao">Observação</label>
              <input class="form-control" v-model="this.produto.observacao" required/>
              <div class="invalid-feedback"></div>
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-12">
            <hr/>
            <router-link to="/produto" class="btn btn-danger" style="margin-right: 10px">Cancelar</router-link>
            <input type="button" class="btn btn-success" value="Salvar" @click="editarProdutoSalvar">
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
import {editarProdutoBuscar, editarProdutoSalvar} from "@/service/produto.service";
export default {
  name: "EditarProdutoForm",
  components: {
    Menu,
    Button,
    Dialog,
    ProgressBar
  },
  data() {
    return {
      iniciaProgressBar: false,
      msgRetornoOperacao: "",
      retornoOperacao: false,
      produto: "",
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

    montarProdutoModelEditar(){
      this.produtoModel =
          {
            "idProduto": this.produto.idProduto,
            "categoriaProduto": this.produto.categoriaProduto,
            "quantidadeProduto": this.produto.quantidadeProduto,
            "nomeProduto": this.produto.nomeProduto,
            "cadastro": this.produto.cadastro,
            "saldo": this.produto.saldo,
            "estoqueMinimo": this.produto.estoqueMinimo,
            "observacao": this.produto.observacao,
          }
      return {
        ...this.produtoModel
      }
    },

    async editarProdutoSalvar() {
      const payload = this.montarProdutoModelEditar();
      this.iniciaProgressBar = true;

      try {
        const response = await editarProdutoSalvar(payload);
        if (response.mensagem === "PRODUTO EDITADO COM SUCESSO.") {
          this.produto = response;
          this.msgRetornoOperacao = this.produto.mensagem;
          this.retornoOperacao = true;
        } else {
          this.msgRetornoOperacao = this.produto.mensagem;
          this.retornoOperacao = true;
        }
      } catch (error) {
        this.msgRetornoOperacao = "Erro ao editar produto.";
      }

      this.iniciaProgressBar = false;
    },

    async editarProdutoBuscar(id) {
      try {
        this.produto = await editarProdutoBuscar(id, this.$toast);
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.editarProdutoBuscar(this.$route.params.id);
  },
}
</script>
