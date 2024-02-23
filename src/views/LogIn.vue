<template>
    <div class="login-header">
      <router-link class="prevPage" to="/">Назад</router-link>
    </div>
    <form @submit.prevent="store.commit('login')">
      <label>Эл. почта: </label>
      <input type="email" required v-model="store.state.email">
      <label>Пароль: </label>
      <input type="password" required v-model="store.state.password">
      <input type="submit" value="Войти">
    </form>
  </template>
  
  <script>
  import store from "@/store";
  
  export default {
    computed: {
      store() {
        return store
      }
    },
  }
  </script>
  
  <style scoped>

  .login-header {
    max-width: 1200px;
    margin: 0 auto;
  }  

  form{
    flex-direction: column;
    justify-content: center;
    width: 400px;
    margin: 0 auto;
    display: flex;
  }
  input{
    font-size: 18px;
    height: 25px;
  }
  input:not(:last-child){
    margin-bottom: 20px;
  }
  input[type=submit]{
    cursor: pointer;
    color: aliceblue;
    border-radius: 5px;
    border: none;
    width: 150px;
    height: 40px;
    margin: 0 auto;
    background-color: rgb(79, 123, 206);
    transition: background-color 0.3s ease;
    box-shadow: 3px 3px 3px rgb(108 108 108);
  }
  .prevPage{
    font-size: 18px;
    color: aliceblue;
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

  .prevPage:hover,input[type=submit]:hover {
    background-color: rgb(50, 83, 145);
  }
  </style>