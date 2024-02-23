import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'products',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Products.vue');
    }
  },

  {
    path: '/login',
    name: 'login',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/LogIn.vue')
    }
  },
  {
    path: '/registration',
    name: 'registration', 
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Reg.vue')
    }
  },
]  