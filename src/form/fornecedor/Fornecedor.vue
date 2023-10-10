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
        <Button label="Excluir" icon="pi pi-times" @click="excluirFornecedor" class="p-button-danger" />
      </template>
    </Dialog>

    <div class="card mt-5">
      <div class="card-body">
        <div class="page-header mb-3">
          <h2>Lista de Fornecedores</h2>
          <hr/>
        </div>

        <div class="row">
          <div class="col-12">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <a class="nav-link active" id="tab1-tab" data-bs-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">Pessoa Física</a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" id="tab2-tab" data-bs-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">Pessoa Jurídica</a>
              </li>
            </ul>

            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                <div class="form-group">
                  <table class="table table-hover">
                    <thead>
                    <tr>
                      <th>Código</th>
                      <th>Nome</th>
                      <th>CPF</th>
                      <th>Telefone</th>
                      <th>E-mail</th>
                      <th>Cadastro</th>
                      <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(fornecedorPF) in listaFornecedoresPF" :key="fornecedorPF.id">
                      <td>{{fornecedorPF.idFornecedor}}</td>
                      <td>{{fornecedorPF.nomeCompleto}}</td>
                      <td>{{fornecedorPF.cpf}}</td>
                      <td>{{fornecedorPF.foneComercial}}</td>
                      <td>{{fornecedorPF.email}}</td>
                      <td>{{ new Date(fornecedorPF.dataCadastro).toLocaleDateString('pt-BR') }}</td>
                      <td v-if='listaFornecedores != ""'>
                        <input type="button" class="btn btn-primary" style="margin-right: 10px" value="Editar"
                               @click="editarFornecedor(fornecedorPF.idFornecedor, 'PF')"/>
                        <input type="button" class="btn btn-danger" value="Excluir" @click="confirmaExcluirFornecedor(fornecedorPF.idFornecedor)"/>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                <div class="form-group">
                  <table class="table table-hover">
                    <thead>
                    <tr>
                      <th>Código</th>
                      <th>Razão Social</th>
                      <th>CNPJ</th>
                      <th>Telefone</th>
                      <th>E-mail</th>
                      <th>Cadastro</th>
                      <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(fornecedorPJ) in listaFornecedoresPJ" :key="fornecedorPJ.id">
                      <td>{{fornecedorPJ.idFornecedor}}</td>
                      <td>{{fornecedorPJ.razaoSocial}}</td>
                      <td>{{fornecedorPJ.cnpj}}</td>
                      <td>{{fornecedorPJ.foneComercialPrincipal}}</td>
                      <td>{{fornecedorPJ.email}}</td>
                      <td>{{ new Date(fornecedorPJ.dataCadastro).toLocaleDateString('pt-BR') }}</td>
                      <td v-if='listaFornecedores != ""'>
                        <input type="button" class="btn btn-primary" style="margin-right: 10px" value="Editar"
                               @click="editarFornecedor(fornecedorPJ.idFornecedor, 'PJ')"/>
                        <input type="button" class="btn btn-danger" value="Excluir" @click="confirmaExcluirFornecedor(fornecedorPJ.idFornecedor,'PJ')"/>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-12">
            <hr/>
            <router-link to="/home" class="btn btn-primary" style="margin-right: 10px">Voltar</router-link>
            <router-link to="novoFornecedor" class="btn btn-success">Novo Fornecedor</router-link>
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
import {
  carregarListaDeFornecedoresPf, carregarListaDeFornecedoresPj,
  excluirFornecedorPf, excluirFornecedorPj
} from "@/service/fornecedor.service";


export default {
  name: "FornecedorForm",
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
      listaFornecedoresPF: "",
      listaFornecedoresPJ: "",
      fornecedor:"",
      idFornecedorExcluir: "",
      targetVariableFornecedorExcluir: "",
    };
  },

  methods: {
    fecharRetornoOperacao(){
      this.retornoOperacao = false;
    },

    fecharConfirmaExcluir(){
      this.idFornecedorExcluir = "";
      this.confirmaExcluir = false;
    },

    confirmaExcluirFornecedor(id, targetVariable) {
      this.idFornecedorExcluir = id;
      this.targetVariableFornecedorExcluir = targetVariable;
      this.msgConfirmaExcluir = "Deseja excluir o fornecedor?";
      this.confirmaExcluir = true;
    },

    async carregarListaDeFornecedoresPF() {
      try {
        this.listaFornecedoresPF = await carregarListaDeFornecedoresPf(this.$toast);
      } catch (error) {
        console.error(error);
      }
    },

    async carregarListaDeFornecedoresPJ() {
      try {
        this.listaFornecedoresPJ = await carregarListaDeFornecedoresPj(this.$toast);
      } catch (error) {
        console.error(error);
      }
    },

    async excluirFornecedor() {
      this.confirmaExcluir = false;
      this.iniciaProgressBar = true;

      try {
        if (this.targetVariableFornecedorExcluir === 'PJ') {
          this.response = await excluirFornecedorPj(this.idFornecedorExcluir, this.$toast);
        }else {
          this.response = await excluirFornecedorPf(this.idFornecedorExcluir, this.$toast);
        }
        if (this.response.status === 200) {
          this.msgRetornoOperacao = "FORNECEDOR EXCLUÍDO COM SUCESSO.";
          this.retornoOperacao = true;
        } else {
          this.msgRetornoOperacao = "Erro ao excluir fornecedor.";
          this.retornoOperacao = true;
        }
      } catch (error) {
        this.msgRetornoOperacao = "Erro ao criar fornecedor: " + error.message;
        this.retornoOperacao = true;
      }

      this.iniciaProgressBar = false;
      await this.carregarListaDeFornecedoresPF();
      await this.carregarListaDeFornecedoresPJ();
    },

    async editarFornecedor(idFornecedor, targetVariable) {
      if (targetVariable == "PJ") {
        this.$router.push({ name: 'editarFornecedorPJ', params: { id: idFornecedor } });
      }else {
        this.$router.push({ name: 'editarFornecedorPF', params: { id: idFornecedor } });
      }
    },
  },

  mounted() {
    this.carregarListaDeFornecedoresPF();
    this.carregarListaDeFornecedoresPJ();
  },
}
</script>
