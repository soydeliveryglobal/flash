import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './../store/index'


Vue.use(VueRouter)

const routes = [
  {
    path: '/tipo',
    name: 'Tipo de envío',
    component: () => import('../views/tipoEnvio'),
    beforeEnter: (to,from, next) => {
      if(store.state.steps.find(x=>x.id==2).valid){
          next()
      }
      else{
        window.event.$emit('touchData')
        next(false)
      }
    }
  },
  {
    path: '/',
    name: 'origen',
    query: {
      Negocio_Cliente: '',
      ApiId: '',
      ApiKey: '',
      Nombre_Cliente:'',
      RUT:'',
      email:'',
      Telefono_cliente:'',
    },
    component: () => import('../views/lugarRetiro')
  },
  {
    path: '/Retiro',
    name: 'destino',
    component: () => import('../views/lugarEnvio'),
    beforeEnter: (to,from, next) => {
      if(store.state.steps.find(x=>x.id==1).valid){
          next()
      }
      else{
      window.event.$emit('touchData')

          next(false)
      }
    }
  },
  {
    path: '/pago',
    name: 'Pago',
    component: () => import('../views/medioPago'),
    beforeEnter: (to,from, next) => {
      if(store.state.steps.find(x=>x.id==3).valid){
          next()
      }
      else{
        window.event.$emit('touchData')

          next(false)
      }
    }
  },
  {
    path: '/paymentApproved',
    name: 'paymentApproved',
    component: () => import('../views/paymentApproved'),
    beforeEnter: (to,from, next) => {
      if(store.state.approved){
          next()
      }
      else{
          next(false)
      }
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
