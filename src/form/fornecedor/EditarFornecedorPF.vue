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
          <div class="row mt-4">
            <div class="col-3">
              <div class="form-group">
                <label for="organizacao">Nome Completo*</label>
                <input class="form-control" v-model="this.fornecedor.nomeCompleto" />
              </div>
            </div>

            <div class="col-2">
              <div class="form-group">
                <label for="organizacao">Data de Nascimento*</label>
                <input type="date" class="form-control" v-model="this.fornecedor.dataNascimento"/>
              </div>
            </div>

            <div class="col-3">
              <div class="form-group">
                <label for="organizacao">E-mail*</label>
                <input class="form-control" v-model="this.fornecedor.email" />
              </div>
            </div>

            <div class="col-2">
              <div class="form-group">
                <label for="organizacao">Telefone Comercial*</label>
                <input class="form-control" v-model="foneComercial" @input="event => formatTelefone(event, 'foneComercial')" />
              </div>
            </div>

            <div class="col-2">
              <div class="form-group">
                <label for="organizacao">Telefone Particular</label>
                <input class="form-control" v-model="foneParticular" @input="event => formatTelefone(event, 'foneParticular')" />
              </div>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-3">
              <div class="form-group">
                <label for="organizacao">CPF*</label>
                <input class="form-control" v-model="cpf" @input="formatCpf" @blur="validarCPF(cpf)" />
              </div>
            </div>

            <div class="col-2">
              <div class="form-group">
                <label for="organizacao">UF Emissão CPF*</label>
                <input class="form-control" v-model="this.fornecedor.ufEmissaoCpf"/>
              </div>
            </div>
            <div class="col-2">
              <div class="form-group">
                <label for="organizacao">Identidade*</label>
                <input class="form-control" v-model="this.fornecedor.identidade" />
              </div>
            </div>

            <div class="col-2">
              <div class="form-group">
                <label for="organizacao">Emissão Identidade*</label>
                <input type="date" class="form-control" v-model="this.fornecedor.dataEmissaoIdentidade" />
              </div>
            </div>

            <div class="col-3">
              <div class="form-group">
                <label for="organizacao">Órgão Emissor*</label>
                <input class="form-control" v-model="this.fornecedor.orgaoEmissor" />
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
import {buscaCepViaCep, editarFornecedorPfBuscar, editarFornecedorPfSalvar} from "@/service/fornecedor.service";

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
      foneParticular: "",
      foneComercial: "",
      cpf: "",
      fornecedorPessoaFisicaModel: {},
      camposCep: {
        logradouro: "",
        bairro: "",
        localidade: "",
        uf: "",
      },
      cpfValido: false,
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

    formatCpf(event) {
      let inputValue = event.target.value.replace(/\D/g, '');
      if (inputValue.length > 11) {
        inputValue = inputValue.slice(0, 11);
      }

      if (inputValue.length > 9) {
        inputValue = inputValue.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, '$1.$2.$3-$4');
      } else if (inputValue.length > 6) {
        inputValue = inputValue.replace(/^(\d{3})(\d{3})(\d{1,3})$/, '$1.$2.$3');
      } else if (inputValue.length > 3) {
        inputValue = inputValue.replace(/^(\d{3})(\d{1,3})$/, '$1.$2');
      }

      this.cpf = inputValue;
    },

    validarCPF(cpf) {
      console.log(cpf)
      // Remover caracteres não numéricos
      cpf = cpf.replace(/[^\d]/g, '');

      if (/^(\d)\1{10}$/.test(cpf)) {
        this.cpfValido = false;
        this.msgRetornoOperacao = "CPF inválido.";
        this.retornoOperacao = true;
        return;
      }

      // Verificar se o CPF tem 11 dígitos
      if (cpf.length !== 11) {
        this.cpfValido = false;
        this.msgRetornoOperacao = "CPF inválido.";
        this.retornoOperacao = true;
        return;
      }

      // Calcular os dígitos verificadores
      let soma = 0;
      for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
      }

      let resto = soma % 11;
      let digito1 = resto < 2 ? 0 : 11 - resto;

      soma = 0;
      for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
      }

      resto = soma % 11;
      let digito2 = resto < 2 ? 0 : 11 - resto;

      // Verificar se os dígitos verificadores são iguais aos dígitos no CPF
      if (parseInt(cpf.charAt(9)) !== digito1 || parseInt(cpf.charAt(10)) !== digito2) {
        this.cpfValido = false;
        this.msgRetornoOperacao = "CPF inválido.";
        this.retornoOperacao = true;
        return;
      }

      this.cpfValido = true;
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

    montarFornecedorPessoaFisicaModelEditar(){
      this.fornecedorPessoaFisicaModel =
          {
            "idFornecedor": this.fornecedor.idFornecedor,
            "dataCadastro": this.fornecedor.dataCadastro,
            "nomeCompleto": this.fornecedor.nomeCompleto,
            "foneParticular": this.foneParticular,
            "foneComercial": this.fornecedor.foneComercial,
            "email": this.fornecedor.email,
            "dataNascimento": this.fornecedor.dataNascimento,
            "identidade": this.fornecedor.identidade,
            "orgaoEmissor": this.fornecedor.orgaoEmissor,
            "dataEmissaoIdentidade": this.fornecedor.dataEmissaoIdentidade,
            "cpf": this.cpf,
            "ufEmissaoCpf": this.fornecedor.ufEmissaoCpf,
            "logradouro": this.camposCep.logradouro,
            "numero": this.fornecedor.numero,
            "complemento": this.fornecedor.complemento,
            'bairro': this.camposCep.bairro,
            "localidade": this.camposCep.localidade,
            "uf": this.camposCep.uf,
            "cep": this.cep,
          }
      return {
        ...this.fornecedorPessoaFisicaModel
      }
    },

    validarCamposObrigatorios() {
      let camposFaltando = [];

      // Validação para pessoa física
      if (!this.nomeCompleto) camposFaltando.push("Nome Completo");
      if (!this.email) camposFaltando.push("E-mail");
      if (!this.foneComercial) camposFaltando.push("Telefone Comercial");
      if (!this.logradouro) camposFaltando.push("Logradouro");
      if (!this.numero) camposFaltando.push("Número");
      if (!this.bairro) camposFaltando.push("Bairro");
      if (!this.localidade) camposFaltando.push("Município");
      if (!this.uf) camposFaltando.push("UF");
      if (!this.cep) camposFaltando.push("CEP");

      return camposFaltando;
    },

    async editarFornecedorSalvar() {
      if (!this.validarCamposObrigatorios()) {
        this.msgRetornoOperacao = "Por favor, preencha todos os campos obrigatórios.";
        this.retornoOperacao = true;
        return;
      }

      if (!this.cpfValido) {
        this.msgRetornoOperacao = "CPF inválido.";
        this.retornoOperacao = true;
        return;
      }

      const payload = this.montarFornecedorPessoaFisicaModelEditar();
      this.iniciaProgressBar = true;

      try {
        const response = await editarFornecedorPfSalvar(payload);
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
        this.fornecedor = await editarFornecedorPfBuscar(id, this.$toast);

        this.fornecedor.dataNascimento = this.formatarData(this.fornecedor.dataNascimento);
        this.fornecedor.dataEmissaoIdentidade = this.formatarData(this.fornecedor.dataEmissaoIdentidade);

        this.cpf = this.fornecedor.cpf;
        this.foneParticular = this.fornecedor.foneParticular;
        this.foneComercial = this.fornecedor.foneComercial;
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
