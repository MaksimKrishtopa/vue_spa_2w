<template>
    <div class="orders">
      <h2>Оформленные заказы:</h2>
      <div class="order-header">
        <router-link class="prevPage" to="/">Назад</router-link>
      </div>
      <div v-show="store.state.orders.length === 0">
        <h2 class="msg">Нет заказов!</h2>
      </div>
      <div class="order" v-for="order in store.state.orders" :key="order.id">
        <div class="product" v-for="product in order" :key="product.id">
          <p><b>{{ product.name }}</b></p>
          <p><b>Описание:</b> {{ product.description }}</p>
          <p><b>Количество:</b> {{ product.quantity }}</p>
          <p><b>Цена:</b> {{ product.price * product.quantity }}</p>
        </div>
        <p class="total-price"><b>Цена заказа: {{ calculateTotalPrice(order) }}</b></p>
      </div>
    </div>
  </template>
  
  <script>
    import store from "@/store";
  
    export default {
      computed: {
        store() {
          return store
        }
      },
      methods:{
        calculateTotalPrice(order){
          let totalPrice = 0;
          for(let i = 0; i < order.length; i++){
            totalPrice += order[i].price * order[i].quantity;
          }
          return totalPrice;
        }
      },
      mounted() {
      if (localStorage.getItem('cart')) {
        this.$store.state.realCart = JSON.parse(localStorage.getItem('cart'));
      }

      if (localStorage.getItem('orders')) {
        this.$store.state.orders = JSON.parse(localStorage.getItem('orders'));
      }
    }
      
    }
  </script>
  
  <style scoped>
    .orders{
      display: flex;
      flex-direction: column;
      max-width: 1200px;
      margin: 0 auto;
    }
    .order-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .order{
        border: 4px solid rgb(79, 123, 206);
        border-radius: 5px;
        flex: 0 1 100%;
        height: 400px;
        display: flex;
        margin-bottom: 40px;
        gap: 15px;
        flex-wrap: wrap;
        justify-content: center;
        align-items: stretch;
        padding: 50px;
    }
    .product{
        border-radius: 5px;
        width: 350px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        background-color: rgb(79, 123, 206);
        color: #fff;
        box-shadow: 3px 3px 3px rgb(108 108 108);
        padding: 15px;
    }
    .prevPage{
      font-size: 18px;
      color: aliceblue;
      text-decoration: none;
      align-items: center;
      justify-content: center;
      background-color: rgb(79, 123, 206);
      transition: background-color 0.3s ease;
      display: flex;
      width: 160px;
      height: 45px;
      border-radius: 5px;
      box-shadow: 3px 3px 3px rgb(108 108 108);
    }

    .prevPage:hover {
      background-color: rgb(50, 83, 145);
    }
    .msg{
      margin-top: 100px;
    }

    .total-price {
      border: 1px solid rgb(79, 123, 206);
      width: 100%;
    }
  </style>