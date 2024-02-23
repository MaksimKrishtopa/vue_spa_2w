<template>
    <div class="cart">
      <h2>Товары в корзине:</h2>
      <div class="cart-header">
        <router-link class="prevPage" to="/">Назад</router-link>
        <a href="#" class="cartButton" v-show="store.state.realCart.length > 0" @click="store.commit('orderCreate')">Оформить заказ</a>
      </div>
      <div v-show="store.state.realCart.length === 0">
        <h2 class="msg"> Пусто! </h2>
      </div>
      <div class="items-list">
      <div class="item" v-for="(item, index) in paginatedCart" :key="item.id">
        <p>Название: {{ item.name }}</p>
        <p>Описание: {{ item.description }}</p>
        <p>Цена: {{ item.price }}</p>
        <div class="quantityItem">
          <button @click="store.commit('removeFromCart', item)" :disabled="item.quantity === 1">-</button>
          <p>Количество: {{ item.quantity }}</p>
          <button @click="store.commit('addToCart', item)">+</button>
        </div>
        <button class="deleteButton" @click="store.commit('delFromCart', item)">Удалить товар</button>
      </div>
      </div>
    <div class="pagination">
      <button @click="changePage('prev')" :disabled="currentPage === 1">Предыдущая</button>
      <span>{{ currentPage }} из {{ totalPages }}</span>
      <button @click="changePage('next')" :disabled="currentPage === totalPages">Следующая</button>
    </div>
    </div>
  </template>
  
<script>
import store from "@/store";

export default {
  computed: {
    store() {
      return store;
    },
    paginatedCart() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.store.state.realCart.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.store.state.realCart.length / this.itemsPerPage);
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 12,
    };
  },
  methods: {
    changePage(action) {
      if (action === 'prev' && this.currentPage > 1) {
        this.currentPage--;
      } else if (action === 'next' && this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>
  
  <style scoped>


  .cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.cart {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  color: #252525;
}

.msg {
  margin-top: 100px;
}

.items-list {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
  color: #ececec;
}

.item {
    flex: 0 1 100%;
    background-color: rgb(79, 123, 206);
    border-radius: 5px;
    padding: 20px;
    height: 420px;
    max-width: 241px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    box-shadow: 3px 3px 3px rgb(108 108 108);
}

.item:not(:last-child) {
  margin-bottom: 10px;
}

.cartButton,
.prevPage {
  font-size: 18px;
  color: #fff;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  background-color: rgb(79, 123, 206);
  display: flex;
  width: 160px;
  height: 50px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  box-shadow: 3px 3px 3px rgb(108 108 108);
}

.cartButton:hover,
.prevPage:hover {
  background-color: rgb(50, 83, 145);
}

.quantityItem {
  margin: 0 auto;
  width: 170px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quantityItem button {
    background-color: rgb(255 255 255);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    padding-left: 6.5px;
    cursor: pointer;
    border: none;
    font-size: 25px;
    color: #252525;
}

.deleteButton {
  margin-bottom: 10px;
  color: #c9d8e5;
  border-radius: 7px;
  border: 0;
  font-size: 15px;
  width: 120px;
  height: 50px;
  background-color: #ff2c2c;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.deleteButton:hover {
  background-color: #d42020;
}

/* Reg.vue and LogIn.vue */
form {
  flex-direction: column;
  justify-content: center;
  width: 400px;
  margin: 0 auto;
  display: flex;
}

input {
  font-size: 18px;
  height: 25px;
}

input:not(:last-child) {
  margin-bottom: 20px;
}

input[type=submit] {
  cursor: pointer;
  color: #fff;
  border-radius: 8px;
  border: none;
  background-color: #42b983;
  width: 150px;
  height: 40px;
  margin: 0 auto;
  transition: background-color 0.3s ease;
}

input[type=submit]:hover {
  background-color: #31875c;
}

.prevPage {
  font-size: 18px;
  color: #fff;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 160px;
  height: 45px;
  border-radius: 5px;
  background-color: rgb(79, 123, 206);
  transition: background-color 0.3s ease;
  box-shadow: 3px 3px 3px rgb(108 108 108);
}

.prevPage:hover {
  background-color: rgb(50, 83, 145);
}

.pagination {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
    margin-top: 25px;
}

.pagination span{
  color: #252525;
}

.pagination button {
    cursor: pointer;
    border: none;
    background-color: rgb(79, 123, 206);
    color: #fff;
    border-radius: 5px;
    padding: 15px;
    font-weight: 600;
    box-shadow: 3px 3px 3px 1px #d1d1d1;
}
  </style>