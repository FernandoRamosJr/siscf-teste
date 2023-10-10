import axios from "../../src/http-common";

export async function carregarListaDeFornecedoresPf($toast) {
    return axios
        .get(`http://localhost:3004/siscf-api/pf/todosFornecedores `)
        .then((response) => {
            console.log(response.data)
            return (response.data) ? response.data : null
        })
        .catch((e) => {
            $toast.add({severity: "error", summary: "Erro", detail: "Erro ao pesquisar fornecedores! " + e.response.data, life: 3004});
            console.log(e);
            return null;
        });
}

export async function carregarListaDeFornecedoresPj($toast) {
    return axios
        .get(`http://localhost:3004/siscf-api/pj/todosFornecedores `)
        .then((response) => {
            console.log(response.data)
            return (response.data) ? response.data : null
        })
        .catch((e) => {
            $toast.add({severity: "error", summary: "Erro", detail: "Erro ao pesquisar fornecedores! " + e.response.data, life: 3004});
            console.log(e);
            return null;
        });
}

export async function fornecedorPessoaJuridicaSalvar(payload) {
    try {
        const response = await axios.post(`http://localhost:3004/siscf-api/pj/criarFornecedor`, payload);
        return response;
    } catch (error) {
        // Tratar erros aqui, se necessário
        return error.response;
    }
}


export async function fornecedorPessoaFisicaSalvar(payload) {
    try {
        const response = await axios.post(`http://localhost:3004/siscf-api/pf/criarFornecedor`, payload);
        return response;
    } catch (error) {
        // Tratar erros aqui, se necessário
        return error.response;
    }
}

export async function editarFornecedorPfBuscar(id, $toast) {
    return axios
        .get(`http://localhost:3004/siscf-api/pf/fornecedorPorId/${id} `)
        .then((response) => {
            return (response.data) ? response.data : null
        })
        .catch((e) => {
            $toast.add({severity: "error", summary: "Erro", detail: "Erro ao pesquisar fornecedores! " + e.response.data, life: 3004});
            console.log(e);
            return null;
        });
}

export async function editarFornecedorPjBuscar(id, $toast) {
    return axios
        .get(`http://localhost:3004/siscf-api/pj/fornecedorPorId/${id} `)
        .then((response) => {
            return (response.data) ? response.data : null
        })
        .catch((e) => {
            $toast.add({severity: "error", summary: "Erro", detail: "Erro ao pesquisar fornecedores! " + e.response.data, life: 3004});
            console.log(e);
            return null;
        });
}

export async function editarFornecedorPjSalvar(payload) {
    try {
        const response = await axios.put(`http://localhost:3004/siscf-api/pj/editarFornecedor`, payload);
        return response;
    } catch (error) {
        // Tratar erros aqui, se necessário
        return error.response;
    }
}

export async function editarFornecedorPfSalvar(payload) {
    try {
        const response = await axios.put(`http://localhost:3004/siscf-api/pf/editarFornecedor`, payload);
        return response;
    } catch (error) {
        // Tratar erros aqui, se necessário
        return error.response;
    }
}

export async function excluirFornecedorPj(id) {
    try {
        const response = await axios.delete(`http://localhost:3004/siscf-api/pj/excluirFornecedor/${id}`);
        return response;
    } catch (error) {
        // Tratar erros aqui, se necessário
        return error.response;
    }
}

export async function excluirFornecedorPf(id) {
    try {
        const response = await axios.delete(`http://localhost:3004/siscf-api/pf/excluirFornecedor/${id}`);
        return response;
    } catch (error) {
        // Tratar erros aqui, se necessário
        return error.response;
    }
}

export async function buscaCepViaCep(cep) {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        return response;
    } catch (error) {
        // Tratar erros aqui, se necessário
        return error.response;
    }
}

