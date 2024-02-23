<template>
    <div class="products">
      <nav>
      <div class="Logo"><img class="add-to-cart__img" src="../assets/Group 1.png" alt="Cart"></div>
        <div class="nav-container">
        
        <p class="nav-links" v-show="store.state.user_token === null">
          <router-link to="/registration">Регистрация</router-link>
        </p>
        <p class="nav-links" v-show="store.state.user_token === null">
          <router-link to="/login">Войти</router-link>
        </p>
        <p class="nav-links" v-show="store.state.user_token !== null">
          <a href="#" @click="store.commit('logout')">Выход</a>
        </p>
        <p class="nav-links" v-show="store.state.user_token !== null">
          <router-link to="/cart">Корзина</router-link>
        </p>
        <p class="nav-links" v-show="store.state.user_token !== null">
          <router-link to="/order">Заказы</router-link>
        </p>
        </div>
      </nav>


    <div class="product-list">
      <div class="product" v-for="(product, index) in displayedProducts" :key="product.id">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>Цена: {{ product.price }}</p>
        <button @click="store.commit('addToCart', product)" v-show="store.state.user_token !== null">
          <img class="add-to-cart__img" src="../assets/корзина.svg" alt="Cart">В корзину
        </button>
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
    displayedProducts() {
      const start = (this.currentPage - 1) * 16;
      const end = start + 16;
      return this.store.state.products.data.slice(start, end) || [];
    },
    totalPages() {
      return Math.ceil((this.store.state.products.data || []).length / 16);
    },
  },
  data() {
    return {
      currentPage: 1,
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

      getPageRange() {
    const total = this.totalPages;
    const current = this.currentPage;
    const rangeStart = Math.max(1, current - 2);
    const rangeEnd = Math.min(total, rangeStart + 4);

    return `${rangeStart}-${rangeEnd} из ${total}`;
  },
  },
  mounted() {
    if (localStorage.token !== undefined && localStorage.token !== null) {
      store.state.user_token = localStorage.token;
    }
    this.$store.commit('fetchProducts');
  },
};
</script>
  
  <style scoped>
  .products {
  max-width: 1200px;
  margin: 0 auto;
  color: #ececec;
}

nav {
    display: flex;
    padding: 5px;
    background-color: rgb(79, 123, 206);
    border-radius: 10px;
    font-size: 24px;
    box-shadow: 5px 5px 5px silver;
    justify-content: space-between;
}

.nav-container{
    display: flex;
    align-items: center;
    gap: 30px;
    padding-right: 30px;
}

.Logo {
    padding-left: 30px;
}

.Logo img{
    width: 100px;
}

.nav-links {
  margin: 0;
}

.nav-links * {
  text-decoration: none;
  color: #ececec;
}

.nav-links *:hover {
  transition: color 0.45s ease;
  color: #d2d2d2;
}

.product-list {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.product {
    background-color: rgb(79, 123, 206);
    border-radius: 5px;
    width: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    padding: 0px 20px 0px 20px;
    box-shadow: 5px 5px 5px silver;
}

.product button {
  width: 150px;
  height: 40px;
  margin-bottom: 30px;
  background-color: rgb(79, 123, 206);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  border: 1px solid #ececec;
}

.product button:hover {
  background-color: rgb(50, 83, 145);
}


.add-to-cart__img {
  width: 25px;
}

.pagination {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
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