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
          <h2>Editar Fornecedor</h2>
          <span class="span-obrigatorio">(*) Campos Obrigatórios</span>
          <hr/>
        </div>

        <div class="row">
          <div class="col-2">
            <div class="form-group">
              <label for="id">Código</label>
              <input class="form-control" v-model="this.fornecedor.idFornecedor" readonly/>
              <div class="invalid-feedback"></div>
            </div>
          </div>

          <div class="col-8">
            <div class="form-group"></div>
          </div>

          <div class="col-2 float-end">
            <div class="form-group">
              <label for="organizacao">Data de Cadastro</label>
              <input class="form-control" :value="formatarDataCadastro(fornecedor.dataCadastro)" readonly/>
              <div class="invalid-feedback"></div>
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-6">
            <div class="form-group">
              <label for="organizacao">Razão Social*</label>
              <input class="form-control" v-model="fornecedor.razaoSocial" required/>
            </div>
          </div>

          <div class="col-6">
            <div class="form-group">
              <label for="organizacao">Nome Fantasia*</label>
              <input class="form-control" v-model="fornecedor.nomeFantasia" required/>
            </div>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-4">
            <div class="form-group">
              <label for="organizacao">CNPJ*</label>
              <input class="form-control" v-model="cnpj" @input="formatCnpj" @blur="validarCNPJ(cnpj)" required/>
            </div>
          </div>

          <div class="col-4">
            <div class="form-group">
              <label for="organizacao">Inscrição Estadual</label>
              <input class="form-control" v-model="fornecedor.inscricaoEstadual" />
            </div>
          </div>

          <div class="col-4">
            <div class="form-group">
              <label for="organizacao">Inscrição Municipal</label>
              <input class="form-control" v-model="fornecedor.inscricaoMunicipal" />
            </div>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-3">
            <div class="form-group">
              <label for="organizacao">Site</label>
              <input class="form-control" v-model="fornecedor.site" />
            </div>
          </div>

          <div class="col-3">
            <div class="form-group">
              <label for="organizacao">E-mail*</label>
              <input class="form-control" v-model="fornecedor.email" required/>
            </div>
          </div>

          <div class="col-3">
            <div class="form-group">
              <label for="organizacao">Telefone Principal*</label>
              <input class="form-control" v-model="foneComercialPrincipal" @input="event => formatTelefone(event, 'foneComercialPrincipal')" required/>
            </div>
          </div>

          <div class="col-3">
            <div class="form-group">
              <label for="organizacao">Telefone Secundário</label>
              <input class="form-control" v-model="foneComercialSecundario" @input="event => formatTelefone(event, 'foneComercialSecundario')" />
            </div>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-2">
            <div class="form-group">
              <label for="organizacao">CEP*</label>
              <input class="form-control" v-model="cep" @input="formatCep" required/>
            </div>
          </div>

          <div class="col-3">
            <div class="form-group">
              <input type="button" class="btn btn-primary mt-4" value="Preencher Endereço" @click="buscaCep"/>
            </div>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-3">
            <div class="form-group">
              <label for="organizacao">Logradouro*</label>
              <input class="form-control" v-model="camposCep.logradouro" required/>
            </div>
          </div>

          <div class="col-1">
            <div class="form-group">
              <label for="organizacao">Número*</label>
              <input class="form-control" v-model="fornecedor.numero" required/>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <label for="organizacao">Complemento</label>
              <input class="form-control" v-model="fornecedor.complemento" />
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <label for="organizacao">Bairro*</label>
              <input class="form-control" v-model="camposCep.bairro" required/>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <label for="organizacao">Município*</label>
              <input class="form-control" v-model="camposCep.localidade" required/>
            </div>
          </div>

          <div class="col-1">
            <div class="form-group">
              <label for="organizacao">UF*</label>
              <input class="form-control" v-model="camposCep.uf" required/>
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-12">
            <hr/>
            <router-link to="/fornecedor" class="btn btn-danger" style="margin-right: 10px">Cancelar</router-link>
            <input type="button" class="btn btn-success" value="Salvar" @click="editarFornecedorSalvar">
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
import {
  buscaCepViaCep,
  editarFornecedorPjBuscar,
  editarFornecedorPjSalvar
} from "@/service/fornecedor.service";

export default {
  name: "EditarFornecedorForm",
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
      fornecedor: "",
      fornecedorModel: {},
      cep: "",
      foneComercialPrincipal: "",
      foneComercialSecundario: "",
      cnpj: "",
      fornecedorPessoaJuridicaModel: {},
      camposCep: {
        logradouro: "",
        bairro: "",
        localidade: "",
        uf: "",
      },
      validaCampos: false,
      cnpjValido: false,
    };
  },

  methods: {
    fecharRetornoOperacao(){
      this.retornoOperacao = false;
    },

    formatarDataCadastro(dataNoFormatoOriginal) {
      const data = new Date(dataNoFormatoOriginal);
      const dia = data.getDate().toString().padStart(2, '0');
      const mes = (data.getMonth() + 1).toString().padStart(2, '0');
      const ano = data.getFullYear();
      return `${dia}/${mes}/${ano}`;
    },

    formatarData(data) {
      const date = new Date(data);
      const ano = date.getFullYear();
      const mes = String(date.getMonth() + 1).padStart(2, '0');
      const dia = String(date.getDate()).padStart(2, '0');
      return `${ano}-${mes}-${dia}`;
    },

    formatTelefone(event, targetVariable) {
      let inputValue = event.target.value.replace(/\D/g, '');

      // Formatar para (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
      if (inputValue.length > 10) {
        inputValue = inputValue.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else {
        inputValue = inputValue.replace(/^(\d{2})(\d{4})(\d{0,4})?$/, '($1) $2-$3');
      }

      this[targetVariable] = inputValue;
    },

    formatCnpj(event) {
      let inputValue = event.target.value.replace(/\D/g, '');
      if (inputValue.length > 14) {
        inputValue = inputValue.slice(0, 14);
      }

      if (inputValue.length > 12) {
        inputValue = inputValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
      } else if (inputValue.length > 8) {
        inputValue = inputValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4})$/, '$1.$2.$3/$4');
      } else if (inputValue.length > 5) {
        inputValue = inputValue.replace(/^(\d{2})(\d{3})(\d{0,3})$/, '$1.$2.$3');
      } else if (inputValue.length > 2) {
        inputValue = inputValue.replace(/^(\d{2})(\d{0,3})$/, '$1.$2');
      }

      this.cnpj = inputValue;
    },

    validarCNPJ(cnpj) {
      // Remover caracteres não numéricos
      cnpj = cnpj.replace(/\D/g, '');

      if(cnpj == '') {
        this.cnpjValido = false;
        this.msgRetornoOperacao = "CPF inválido.";
        this.retornoOperacao = true;
        return;
      }


      if (cnpj.length != 14) {
        this.cnpjValido = false;
        this.msgRetornoOperacao = "CPF inválido.";
        this.retornoOperacao = true;
        return;
      }

      // Elimina CNPJs invalidos conhecidos
      if (cnpj == "00000000000000" ||
          cnpj == "11111111111111" ||
          cnpj == "22222222222222" ||
          cnpj == "33333333333333" ||
          cnpj == "44444444444444" ||
          cnpj == "55555555555555" ||
          cnpj == "66666666666666" ||
          cnpj == "77777777777777" ||
          cnpj == "88888888888888" ||
          cnpj == "99999999999999") {
        this.cnpjValido = false;
        this.msgRetornoOperacao = "CPF inválido.";
        this.retornoOperacao = true;
        return;
      }

      // Valida DVs
      let tamanho = cnpj.length - 2
      let numeros = cnpj.substring(0,tamanho);
      let digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
          pos = 9;
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0)) {
        this.cnpjValido = false;
        this.msgRetornoOperacao = "CPF inválido.";
        this.retornoOperacao = true;
        return;
      }

      tamanho = tamanho + 1;
      numeros = cnpj.substring(0,tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
          pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1)) {
        this.cnpjValido = false;
        this.msgRetornoOperacao = "CPF inválido.";
        this.retornoOperacao = true;
        return;
      }

      // CNPJ é válido
      this.cnpjValido = true;
    },

    formatCep(event) {
      let inputValue = event.target.value.replace(/\D/g, '');
      if (inputValue.length > 8) {
        inputValue = inputValue.slice(0, 8);
      }

      if (inputValue.length > 5) {
        inputValue = inputValue.replace(/^(\d{5})(\d{1,3})$/, '$1-$2');
      } else {
        inputValue = inputValue.replace(/^(\d{5})(\d{1,3})?$/, '$1');
      }

      this.cep = inputValue;
    },


    async buscaCep() {
      if (this.cep == null || this.cep == "") {
        this.msgRetornoOperacao = "Campo CEP não pode ser vazio";
        this.retornoOperacao = true;
        return;
      }
      this.iniciaProgressBar = true;

      try {
        const response = await buscaCepViaCep(this.cep);
        this.camposCep = response.data;
        if (this.camposCep.erro) {
          this.msgRetornoOperacao = "CEP não encontrado.";
          this.retornoOperacao = true;
        }
      } catch (error) {
        this.msgRetornoOperacao = "CEP não encontrado.";
        this.retornoOperacao = true;
      }
      this.iniciaProgressBar = false;
    },

    montarFornecedorPessoaJuridicaModelSalvar(){
      this.fornecedorPessoaJuridicaModel =
          {
            "idFornecedor": this.fornecedor.idFornecedor,
            "dataCadastro": this.fornecedor.dataCadastro,
            "razaoSocial": this.fornecedor.razaoSocial,
            "nomeFantasia": this.fornecedor.nomeFantasia,
            "cnpj": this.cnpj,
            "inscricaoEstadual": this.fornecedor.inscricaoEstadual,
            "inscricaoMunicipal": this.fornecedor.inscricaoMunicipal,
            "site": this.fornecedor.site,
            "email": this.fornecedor.email,
            "foneComercialPrincipal": this.foneComercialPrincipal,
            "foneComercialSecundario": this.foneComercialSecundario,

            "logradouro": this.camposCep.logradouro,
            "numero": this.fornecedor.numero,
            "complemento": this.fornecedor.complemento,
            'bairro': this.camposCep.bairro,
            "localidade": this.camposCep.localidade,
            "uf": this.camposCep.uf,
            "cep": this.cep,
          }
      return {
        ...this.fornecedorPessoaJuridicaModel
      }
    },

    validarCamposObrigatorios() {
      let camposFaltando = [];

      // Validação para pessoa jurídica
      if (!this.fornecedor.razaoSocial) camposFaltando.push("Razão Social");
      if (!this.cnpj) camposFaltando.push("CNPJ");
      if (!this.fornecedor.email) camposFaltando.push("E-mail");
      if (!this.foneComercialPrincipal) camposFaltando.push("Telefone Comercial");
      if (!this.camposCep.logradouro) camposFaltando.push("Logradouro");
      if (!this.fornecedor.numero) camposFaltando.push("Número");
      if (!this.camposCep.bairro) camposFaltando.push("Bairro");
      if (!this.fornecedor.localidade) camposFaltando.push("Município");
      if (!this.camposCep.uf) camposFaltando.push("UF");
      if (!this.cep) camposFaltando.push("CEP");

      console.log(camposFaltando)

      if (camposFaltando.length === 0) {
        this.validaCampos = true;
      }
    },

    async editarFornecedorSalvar() {
      this.validarCamposObrigatorios()
      if (!this.validaCampos) {
        this.msgRetornoOperacao = "Por favor, preencha todos os campos obrigatórios.";
        this.retornoOperacao = true;
        return;
      }

      if (!this.cnpjValido) {
        this.msgRetornoOperacao = "CNPJ inválido.";
        this.retornoOperacao = true;
        return;
      }

      const payload = this.montarFornecedorPessoaJuridicaModelSalvar();
      this.iniciaProgressBar = true;

      try {
        const response = await editarFornecedorPjSalvar(payload);
        console.log(response.status)
        if (response.status === 200) {
          this.msgRetornoOperacao = "FORNECEDOR EDITADO COM SUCESSO.";
          this.retornoOperacao = true;
        } else {
          this.msgRetornoOperacao = "Erro ao editar fornecedor.";
          this.retornoOperacao = true;
        }
      } catch (error) {
        this.msgRetornoOperacao = "Erro ao editar fornecedor catch.";
      }

      this.iniciaProgressBar = false;
    },

    async editarFornecedorBuscar(id) {
      try {
        this.fornecedor = await editarFornecedorPjBuscar(id, this.$toast);

        this.cnpj = this.fornecedor.cnpj;
        this.foneComercialPrincipal = this.fornecedor.foneComercialPrincipal;
        this.foneComercialSecundario = this.fornecedor.foneComercialSecundario;
        this.cep = this.fornecedor.cep;

        this.camposCep.logradouro = this.fornecedor.logradouro;
        this.camposCep.bairro = this.fornecedor.bairro;
        this.camposCep.localidade = this.fornecedor.localidade;
        this.camposCep.uf = this.fornecedor.uf;

      } catch (error) {
        console.error(error);
      }
    },
  },

  mounted() {
    this.editarFornecedorBuscar(this.$route.params.id);
  },
}
</script>

<style>
.span-obrigatorio {
  color: red;
  font-size: 12px;
}
</style>
