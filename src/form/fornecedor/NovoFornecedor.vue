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

    <Dialog name="confirmaCep" id="confirmaCep" v-model:visible="confirmaCep" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}">
      <p class="h5" >{{ msgConfirmaCep }}</p>
      <template #footer>
        <Button label="Não" icon="pi pi-times" @click="fecharConfirmaCep" class="p-button-warning" />
        <Button label="Sim" icon="pi pi-times" @click="buscaCep" class="p-button-danger" />
      </template>
    </Dialog>

    <div class="card mt-5">
      <form class="card-body">
        <div class="page-header mb-3">
          <h2>Novo Fornecedor</h2>
          <span class="span-obrigatorio">(*) Campos Obrigatórios</span>
          <hr/>
        </div>

        <div class="row">
          <div class="col-2">
            <div class="form-group">
              <label for="id">Código</label>
              <input class="form-control" v-model="idFornecedor" readonly/>
              <div class="invalid-feedback"></div>
            </div>
          </div>

          <div class="col-8">
            <div class="form-group"></div>
          </div>

          <div class="col-2 float-end">
            <div class="form-group">
              <label for="organizacao">Data de Cadastro</label>
              <input class="form-control" v-model="dataCadastro" readonly/>
              <div class="invalid-feedback"></div>
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-2">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="pessoaJuridicaRadio" value="pessoaJuridicaRadio" @change="toggleTipoPessoa" checked>
              <label class="form-check-label" for="pessoaJuridicaRadio">Pessoa Jurídica</label>
            </div>
          </div>

          <div class="col-2">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="pessoaFisicaRadio" value="pessoaFisicaRadio" @change="toggleTipoPessoa">
              <label class="form-check-label" for="pessoaFisicaRadio">Pessoa Física</label>
            </div>
          </div>
        </div>

        <div v-if="isPessoaJuridica">
          <div class="row mt-4">
            <div class="col-6">
              <div class="form-group">
                <label for="organizacao">Razão Social*</label>
                <input class="form-control" v-model="razaoSocial" required/>
              </div>
            </div>

            <div class="col-6">
              <div class="form-group">
                <label for="organizacao">Nome Fantasia*</label>
                <input class="form-control" v-model="nomeFantasia" required/>
              </div>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-4">
              <div class="form-group">
                <label for="organizacao">CNPJ*</label>
                <input class="form-control" v-model="cnpj" @input="formatCnpj" required/>
              </div>
            </div>

            <div class="col-4">
              <div class="form-group">
                <label for="organizacao">Inscrição Estadual</label>
                <input class="form-control" v-model="inscricaoEstadual" />
              </div>
            </div>

            <div class="col-4">
              <div class="form-group">
                <label for="organizacao">Inscrição Municipal</label>
                <input class="form-control" v-model="inscricaoMunicipal" />
              </div>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-3">
              <div class="form-group">
                <label for="organizacao">Site</label>
                <input class="form-control" v-model="site" />
              </div>
            </div>

            <div class="col-3">
              <div class="form-group">
                <label for="organizacao">E-mail*</label>
                <input class="form-control" v-model="emailJuridico" required/>
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
        </div>


        <div v-if="!isPessoaJuridica">
          <div class="row mt-4">
            <div class="col-3">
              <div class="form-group">
                <label for="organizacao">Nome Completo*</label>
                <input class="form-control" v-model="nomeCompleto" />
              </div>
            </div>

            <div class="col-2">
              <div class="form-group">
                <label for="organizacao">Data de Nascimento*</label>
                <input type="date" class="form-control" v-model="dataNascimento" />
              </div>
            </div>

            <div class="col-3">
              <div class="form-group">
                <label for="organizacao">E-mail*</label>
                <input class="form-control" v-model="emailFisico" />
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
                <input class="form-control" v-model="cpf" @input="formatCpf" />
              </div>
            </div>

            <div class="col-2">
              <div class="form-group">
                <label for="organizacao">Emissão CPF*</label>
                <input type="date" class="form-control" v-model="dataEmissaoCpf" />
              </div>
            </div>
            <div class="col-2">
              <div class="form-group">
                <label for="organizacao">Identidade*</label>
                <input class="form-control" v-model="identidade" />
              </div>
            </div>

            <div class="col-2">
              <div class="form-group">
                <label for="organizacao">Emissão Identidade*</label>
                <input type="date" class="form-control" v-model="dataEmissaoIdentidade" />
              </div>
            </div>

            <div class="col-3">
              <div class="form-group">
                <label for="organizacao">Órgão Emissor*</label>
                <input class="form-control" v-model="orgaoEmissor" />
              </div>
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
              <input class="form-control" v-model="numero" required/>
            </div>
          </div>

          <div class="col-2">
            <div class="form-group">
              <label for="organizacao">Complemento</label>
              <input class="form-control" v-model="camposCep.complemento" />
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
            <router-link to="/siscf-web/fornecedor" class="btn btn-danger" style="margin-right: 10px">Cancelar</router-link>
            <input type="button" class="btn btn-success" value="Salvar" @click="fornecedorSalvar">
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
  fornecedorPessoaFisicaSalvar,
  fornecedorPessoaJuridicaSalvar,
} from "@/service/fornecedor.service";
export default {
  name: "NovoFornecedorForm",
  components: {
    Menu,
    Button,
    Dialog,
    ProgressBar
  },
  data() {
    return {
      isPessoaJuridica: true,
      iniciaProgressBar: false,
      msgRetornoOperacao: "",
      retornoOperacao: false,
      confirmaCep: false,
      msgConfirmaCep: "",
      fornecedor: "",
      idFornecedor: "",
      nomeFornecedor: "",
      fornecedorPessoaJuridicaModel: {},
      fornecedorPessoaFisicaModel: {},
      camposCep: "",
      cnpj: "",
      cpf: "",
      cep: "",
      foneParticular: "",
      foneComercial: "",
      foneComercialSecundario: "",
      foneComercialPrincipal: "",
      emailJuridico: "",
      emailFisico: ""
    };
  },
  methods: {
    fecharRetornoOperacao(){
      this.retornoOperacao = false;
    },

    fecharConfirmaCep(){
      this.confirmaCep = false;
    },

    toggleTipoPessoa() {
      this.isPessoaJuridica = !this.isPessoaJuridica;
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
            "idFornecedor": this.idFornecedor,
            "dataCadastro": this.dataCadastro,
            "razaoSocial": this.razaoSocial,
            "nomeFantasia": this.nomeFantasia,
            "cnpj": this.cnpj,
            "inscricaoEstadual": this.inscricaoEstadual,
            "inscricaoMunicipal": this.inscricaoMunicipal,
            "site": this.site,
            "email": this.emailJuridico,
            "foneComercialPrincipal": this.foneComercialPrincipal,
            "foneComercialSecundario": this.foneComercialSecundario,

            "logradouro": this.camposCep.logradouro,
            "numero": this.numero,
            "complemento": this.complemento,
            'bairro': this.camposCep.bairro,
            "localidade": this.camposCep.localidade,
            "uf": this.camposCep.uf,
            "cep": this.cep,
          }
      return {
        ...this.fornecedorPessoaJuridicaModel
      }
    },

    montarFornecedorPessoaFisicaModelSalvar(){
      this.fornecedorPessoaFisicaModel =
          {
            "idFornecedor": this.idFornecedor,
            "dataCadastro": this.dataCadastro,
            "nomeCompleto": this.nomeCompleto,
            "foneParticular": this.foneParticular,
            "foneComercial": this.foneComercial,
            "email": this.emailFisico,
            "dataNascimento": this.dataNascimento,
            "identidade": this.identidade,
            "orgaoEmissor": this.orgaoEmissor,
            "dataEmissaoIdentidade": this.dataEmissaoIdentidade,
            "cpf": this.cpf,
            "dataEmissaoCpf": this.dataEmissaoCpf,

            "logradouro": this.camposCep.logradouro,
            "numero": this.numero,
            "complemento": this.complemento,
            'bairro': this.camposCep.bairro,
            "localidade": this.camposCep.localidade,
            "uf": this.camposCep.uf,
            "cep": this.cep,
          }
      return {
        ...this.fornecedorPessoaFisicaModel
      }
    },

    // Método para validar campos obrigatórios
    validarCamposObrigatorios() {
      let camposFaltando = [];

      if (this.isPessoaJuridica) {
        // Validação para pessoa jurídica
        if (!this.razaoSocial) camposFaltando.push("Razão Social");
        if (!this.nomeFantasia) camposFaltando.push("Nome Fantasia");
        if (!this.cnpj) camposFaltando.push("CNPJ");
        if (!this.email) camposFaltando.push("E-mail");
        if (!this.foneComercialPrincipal) camposFaltando.push("Telefone Comercial");
        if (!this.logradouro) camposFaltando.push("Logradouro");
        if (!this.numero) camposFaltando.push("Número");
        if (!this.bairro) camposFaltando.push("Bairro");
        if (!this.localidade) camposFaltando.push("Município");
        if (!this.uf) camposFaltando.push("UF");
        if (!this.cep) camposFaltando.push("CEP");
      } else {
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
      }

      return camposFaltando;
    },


    async fornecedorSalvar() {
      if (this.isPessoaJuridica) {
        const payload = this.montarFornecedorPessoaJuridicaModelSalvar();
        await this.fornecedorPessoaJuridicaSalvar(payload)
      }else {
        const payload = this.montarFornecedorPessoaFisicaModelSalvar();
        await this.fornecedorPessoaFisicaSalvar(payload)
      }
    },

    async fornecedorPessoaJuridicaSalvar(payload) {
      if (!this.validarCamposObrigatorios()) {
        this.msgRetornoOperacao = "Por favor, preencha todos os campos obrigatórios.";
        this.retornoOperacao = true;
        return;
      }
      this.iniciaProgressBar = true;

      try {
        const response = await fornecedorPessoaJuridicaSalvar(payload);
        if (response.status === 200) {
          this.msgRetornoOperacao = "FORNECEDOR CRIADO COM SUCESSO.";
          this.retornoOperacao = true;
          await this.retornaHome();
        } else {
          this.msgRetornoOperacao = "Erro ao criar fornecedor.";
          this.retornoOperacao = true;
        }
      } catch (error) {
        this.msgRetornoOperacao = "Erro ao excluir fornecedor: " + error.message;
        this.retornoOperacao = true;
      }

      this.iniciaProgressBar = false;
    },


    async fornecedorPessoaFisicaSalvar(payload) {
      if (!this.validarCamposObrigatorios()) {
        this.msgRetornoOperacao = "Por favor, preencha todos os campos obrigatórios.";
        this.retornoOperacao = true;
        return;
      }
      this.iniciaProgressBar = true;

      try {
        const response = await fornecedorPessoaFisicaSalvar(payload, this.$toast);
        if (response.status === 200) {
          this.msgRetornoOperacao = "FORNECEDOR CRIADO COM SUCESSO.";
          this.retornoOperacao = true;
          await this.retornaHome();
        } else {
          this.msgRetornoOperacao = "Erro ao criar fornecedor.";
          this.retornoOperacao = true;
        }
      } catch (error) {
        this.msgRetornoOperacao = "Erro ao criar fornecedor.";
      }

      this.iniciaProgressBar = false;
    },

    async retornaHome() {
      this.msgRetornoOperacao = this.fornecedor.mensagem;
      this.retornoOperacao = true;
      this.$router.push({ name: 'Fornecedor' });
    },
  },
}
</script>

<style>
.span-obrigatorio {
  color: red;
  font-size: 12px;
}
</style>
