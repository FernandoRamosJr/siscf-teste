import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { createStore } from 'vuex';
import PrimeVue from 'primevue/config';


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@fortawesome/fontawesome-free/css/all.css";
import "primevue/resources/primevue.min.css"                 //core css
import "primeicons/primeicons.css"                           //icons
import ToastService from 'primevue/toastservice';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


const store = createStore({
    state () {
        return {
            isLogged: false,
            user:{
                nome:""
            },
            appAmbiente: "",
        }
    },

    mutations: {
        login (state) {
            state.isLogged = true;
        },
        logout (state){
            state.isLogged = false;
        },
        usuarioLogado(state,user){
            state.user = user;
        },
        setAppAmbiente(state, ambiente) {
            state.appAmbiente = ambiente;
        },
    },

    actions: {
        login (context) {
            context.commit('login')
        },
        logout (context) {
            context.commit('logout')
        },
        atualizarUsuarioLogado(context,user){
            context.commit('usuarioLogado',user);
        },
        atualizarAppAmbiente(context, ambiente) {
            context.commit('setAppAmbiente', ambiente);
        },
    },
});

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.use(PrimeVue);
app.use(ToastService);
app.use(store);
app.mount('#app')
