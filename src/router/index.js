import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'products',
    component: function () {
      return import( '../views/Products.vue');
    }
  },

  {
    path: '/login',
    name: 'login',
    component: function () {
      return import( '../views/LogIn.vue')
    }
  },
  {
    path: '/registration',
    name: 'registration', 
    component: function () {
      return import( '../views/Reg.vue')
    }
  },

  {
    path: '/cart',
    name: 'cart',
    component: function () {
      return import( '../views/Cart.vue')
    }
  },

  {
    path: '/order',
    name: 'order',
    component: function () {
      return import( '../views/Orders.vue')
    }
  },
]  

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export { router };  
export default router;
