import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pedidos', //Caminho para acessar rota
    name: 'Pedidos', //View utilizada para acessar rota
    //Importação da view
    component: () => import(/* webpackChunkName: "pedidos" */ '../views/Pedidos.vue') 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
