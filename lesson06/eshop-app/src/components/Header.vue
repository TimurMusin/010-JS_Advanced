<template>
  <header class="header">
    <input v-model="filteredText" type="search" class="search-input" placeholder="Поиск в каталоге...">
    <button @click="clickCart()" type="button" class="cart-button">Корзина</button>
  </header>
</template>

<script>
export default {
  data: () => ({
    filteredText: "",
  }),
  watch: {
    filteredText() {
      this.$emit('callFilterGoods', this.filteredText);
      console.log(this.filteredText);
    },
  },
  methods: {
    clickCart() {
      this.$emit('callToggleCart')
    }
  }
}
</script>

<style scoped>
.header {
  background: lightgray;
  height: 60px;
  padding: 0 100px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
}

.search-input {
  width: 40%;
  height: 30px;
  border-radius: 5px;
  padding: 5px;
  background-color: #d1f0dc;
}

.cart-button {
  border: 1px solid black;
  border-radius: 1rem;
  padding: 5px 10px;
}

.cart-button:hover {
  cursor: pointer;
}

.cart-button:active {
  background-color: aqua;
}
</style>
