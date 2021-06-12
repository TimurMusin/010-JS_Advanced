<template>
  <div id="app">
    <Header @callFilterGoods="filterGoods" @callToggleCart="toggleCart" />
    <main class="main">
      <Catalog :goods="filteredGoods" @callAddItemToCart="addItemToCart" />
      <Cart :cart="cart" :cartSum="cartSum" :cartDisplay="cartDisplay" @callChangeItemInCart="changeItemInCart" />
    </main>
  </div>
</template>

<script>
import Header from './components/Header';
import Catalog from './components/Catalog';
import Cart from './components/Cart';

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

export default {
  components: {
    Header,
    Catalog,
    Cart,
  },
  data: () => ({
    goods: [],
    filteredGoods: [],
    cart: [],
    cartSum: 0,
    isVisibleCart: false,
    cartDisplay: 'none',
  }),
  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`)
  },
  watch: {
    cart() {
      for (let i = 0; i < this.cart.length; i++) {
        this.cartSum += this.cart[i].price * this.cart[i].quantity;
      }
    }
  },
  methods: {
    makeGETRequest(url) {
      fetch(url)
        .then((data) => data.json())
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
        })
    },
    filterGoods(filteredText) {
      const regexp = new RegExp(filteredText, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    },
    toggleCart() { 
      this.isVisibleCart = !this.isVisibleCart;
      if (this.isVisibleCart) {this.cartDisplay = ''}
      else {this.cartDisplay = 'none'}
    },
    checkItemInCart(id) {
      let exist = false;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id_product === id) {
          exist = true;
          return i;
          }
      }
      if (!exist) return exist
    },
    addItemToCart(item) {
      let index = this.checkItemInCart(item.id_product);
      if (index !== false) {this.cart[index].quantity++}
      else {
        item['quantity'] = 0;
        this.cart.push(item);
        this.cart[this.cart.length - 1].quantity = 1;
      }
    },
    changeItemInCart(id, action) {
      let index = this.checkItemInCart(id);
      switch (action) {
        case 'plus':
          this.cart[index].quantity++;
          break;
        case 'minus':
          if (this.cart[index].quantity === 1) {
              this.cart.splice(index, 1);
          } else {
              this.cart[index].quantity--;
          }
          break;
        case 'del':
          this.cart.splice(index, 1);
      }
    }
  }
}
</script>

<style>
* {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
}

.main {
  padding: 20px 100px;
}
</style>
