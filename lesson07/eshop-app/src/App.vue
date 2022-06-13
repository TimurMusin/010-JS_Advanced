<template>
  <div id="app">
    <Header
      @callFilterGoods="filterGoods"
      @callToggleCart="toggleCart"
    />
    <main class="main">
      <Catalog
        :goods="filteredGoods"
        @callChangeCart="changeCart"
      />
      <Cart
        :cart="cart"
        :cartSum="cartSum"
        :cartDisplay="cartDisplay"
        @callChangeCart="changeCart"
      />
    </main>
  </div>
</template>

<script>
import Header from './components/Header';
import Catalog from './components/Catalog';
import Cart from './components/Cart';

// const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
const API_URL = 'http://localhost:3000';

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
    this.getCatalog();
    this.getCart();
  },
  watch: {
    cart() {
      this.cartSum = 0;
      for (let i = 0; i < this.cart.length; i++) {
        this.cartSum += this.cart[i].price * this.cart[i].quantity;
      }
    }
  },
  methods: {
    makeGETRequest(url) {
      return fetch(url)
        .then((data) => data.json())
    },
    makePOSTRequest(url, data, action) {
      console.log(data);
      data['action'] = action;
      console.log(data);
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
        .then((data) => data.json())
    },
    getCatalog() {
      this.makeGETRequest(`${API_URL}/catalogData`)
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
        })
    },
    getCart() {
      this.makeGETRequest(`${API_URL}/cartData`)
        .then((data) => {
          this.cart = data;
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
    changeCart(item, action) {
      this.makePOSTRequest(`${API_URL}/changeCart`, item, action)
        .then(() => this.getCart())
    },

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
