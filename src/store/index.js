import index, { createStore } from 'vuex'
import axios from "axios";
import { router } from "@/router";
export default createStore({
  state: {
    products: {
      data: [],
    },
    realCart: [],
    orders: [],
    fio: "",
    email: "",
    password: "",
    user_token: null,
    user_auth: false,
  },
  getters: {
  },
  mutations: {
    addToCart(state, product){
      let item = product;
      item = {...item, quantity: 1};
      if(state.realCart.length > 0){
        let bool = state.realCart.some(i => i.id === item.id);
        if(bool){
          let itemIndex = state.realCart.findIndex(el => el.id === item.id);
          state.realCart[itemIndex]['quantity'] += 1;
        }
        else{
          state.realCart.push(item);
        }
      }
      else{
        state.realCart.push(item);
      }
      localStorage.setItem('cart', JSON.stringify(state.realCart));
    },
    removeFromCart(state, product){
      if(state.realCart.length > 0){
        let bool = state.realCart.some(i => i.id === product.id);

        if(bool){
          let index = state.realCart.findIndex(el => el.id === product.id);
          if(state.realCart[index]['quantity'] !== 0){
            state.realCart[index]['quantity'] -= 1;
          }
        }

      }
      localStorage.setItem('cart', JSON.stringify(state.realCart));
    },
    delFromCart(state, product){
      let indexCart = state.realCart.indexOf(product);
      state.realCart.splice(indexCart, 1);
      localStorage.setItem('cart', JSON.stringify(state.realCart));
    },
    orderCreate(state) {
      let newOrders = state.realCart.map((item) => ({ ...item }));
      state.orders.push(newOrders);
      state.realCart.splice(0, state.realCart.length);
      console.log(state.orders);

      
      router.push({ name: "order" });
      localStorage.setItem('orders', JSON.stringify(state.orders));
    },
    async fetchProducts(state) {
      try {
        const response = await axios.get('https://jurapro.bhuser.ru/api-shop/products');
        
        if (response && response.data) {
          state.products = response.data;
          console.log('Fetched products:', state.products);
        } else {
          console.error('Failed to fetch products from the server.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async login(state){

      let userInfo = {
        email: state.email,
        password: state.password
      }
      
      const data = await axios.post('https://jurapro.bhuser.ru/api-shop/login', userInfo)
          .then(function(response) {
            state.user_token = response.data.data.user_token;
            localStorage.token = state.user_token;
          })
          .catch(error =>{console.log(error)})

      console.log(data);

      if(localStorage.token !== undefined && localStorage.token !== null){
        window.location.href = "/";
      }
    },
    async registration(state){

      let userInfo = {
        fio: state.fio,
        email: state.email,
        password: state.password
      }

      const data = await axios.post('https://jurapro.bhuser.ru/api-shop/signup', userInfo)
          .then(function (response) {
            console.log(response);
            state.user_token = response.data.data.user_token;
            localStorage.token = state.user_token;
          })
          .catch(error =>{console.log(error)})
      console.log(data)

      if(localStorage.token !== undefined && localStorage.token !== null){
        window.location.href = "/login";
      }
    },
    logout(state){
      state.user_token = null;
      localStorage.clear();
    }
  },
  actions: {
  },
  modules: {
  }
})
