import axios from "../../src/http-common";

export async function carregarListaDeProdutos($toast) {
    return axios
        .get(`http://localhost:3004/siscf-api/produto/todosProdutos `)
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

export async function produtoSalvar(payload, $toast) {
    return axios
        .post(`http://localhost:3004/siscf-api/produto/criarProduto`, payload)
        .then((response) => {
            if (response.status === 200) return response.data;
        })
        .catch((e) => {
            $toast.add({
                severity: "error",
                summary: "Erro",
                detail: "Erro ao salvar produto! " + e.response.data,
                life: 5000,
            });
            console.log(e);
            return null;
        });
}

export async function editarProdutoBuscar(id, $toast) {
    return axios
        .get(`http://localhost:3004/siscf-api/produto/produtoPorId/${id} `)
        .then((response) => {
            return (response.data) ? response.data : null
        })
        .catch((e) => {
            $toast.add({severity: "error", summary: "Erro", detail: "Erro ao pesquisar fornecedores! " + e.response.data, life: 3004});
            console.log(e);
            return null;
        });
}

export async function carregarListaDeProdutosAutoComplete(payload) {
    console.log("Função: " +payload)
    return axios
        .post("http://localhost:3004/siscf-api/produto/produtoPorNomeCategoria", payload)
        .then((response) => {
            return (response.data) ? response.data : null
        })
        .catch((e) => {
            console.log(e);
            return null;
        });
}

export async function editarProdutoSalvar(payload, $toast) {
    return axios
        .put(`http://localhost:3004/siscf-api/produto/editarProduto`, payload)
        .then((response) => {
            if (response.status === 200) return response.data;
        })
        .catch((e) => {
            $toast.add({
                severity: "error",
                summary: "Erro",
                detail: "Erro ao salvar produto! " + e.response.data,
                life: 5000,
            });
            console.log(e);
            return null;
        });
}

export async function excluirProduto(id, $toast) {
    return axios
        .delete(`http://localhost:3004/siscf-api/produto/excluirProduto/${id} `)
        .then((response) => {
            return (response.data) ? response.data : null
        })
        .catch((e) => {
            $toast.add({severity: "error", summary: "Erro", detail: "Erro ao excluir produto! " + e.response.data, life: 3004
            });
            console.log(e);
            return null;
        });
}

