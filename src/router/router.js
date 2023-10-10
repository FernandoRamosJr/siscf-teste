import { createWebHistory, createRouter } from "vue-router";

import Home from "@/view/home/Home.vue";
import Login from "@/form/login/Login.vue";

import NotFound from "@/components/NotFound.vue";
import NovoFornecedor from "@/form/fornecedor/NovoFornecedor.vue";
import Produto from "@/form/produto/Produto.vue";
import Fornecedor from "@/form/fornecedor/Fornecedor.vue";
import NovoProduto from "@/form/produto/NovoProduto.vue";
import EditarProduto from "@/form/produto/EditarProduto.vue";
import EditarFornecedorPF from "@/form/fornecedor/EditarFornecedorPF.vue";
import EditarFornecedorPJ from "@/form/fornecedor/EditarFornecedorPJ.vue";


const routes = [ 
  {
    path: "/siscf-web/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/siscf-web",
    name: "raiz",
    component: Home,
  },  
  {
    path: "/siscf-web/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/siscf-web/fornecedor",
    name: "Fornecedor",
    component: Fornecedor,
  },
  {
    path: "/siscf-web/novoFornecedor",
    name: "novoFornecedor",
    component: NovoFornecedor,
  },
  {
    path: "/siscf-web/editarFornecedorPF/:id",
    name: "editarFornecedorPF",
    component: EditarFornecedorPF,
  },
  {
    path: "/siscf-web/editarFornecedorPJ/:id",
    name: "editarFornecedorPJ",
    component: EditarFornecedorPJ,
  },
  {
    path: "/siscf-web/produto",
    name: "produto",
    component: Produto,
  },
  {
    path: "/siscf-web/novoProduto",
    name: "novoProduto",
    component: NovoProduto,
  },
  {
    path: "/siscf-web/editarProduto/:id",
    name: "editarProduto",
    component: EditarProduto,
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: NotFound
}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' &&  sessionStorage.getItem('token') == null) next({ name: 'Login' })
  else if (sessionStorage.getItem('sci-api') != null) {
    next()
  }
  else next()
})
export default router;
