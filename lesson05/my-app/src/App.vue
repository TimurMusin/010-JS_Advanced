<template>
  <div id="app">
    <header class="header">
      <input v-model="searchLine" type="search" class="search-input" id="search-input" placeholder="Поиск в каталоге...">
      <button @click="cartBtn" type="button" class="cart-button">Корзина</button>
    </header>
    <main class="main">
      <div class="catalog">
        <p>Каталог</p>
        <div class="catalog-list">
          <!-- Задание * -->
          <h3 v-if="filteredGoods.length === 0">Каталог пуст</h3>
          <div v-for="item in filteredGoods" :key="item.id_product" class="catalog-item">
            <img src="https://picsum.photos/180/180" alt="товар">
            <h3>{{item.product_name}}</h3>
            <p>{{item.price}}</p>
            <button @click="addItemToCart(item)" v-bind:id="item.id_product">Добавить</button> 
          </div>
        </div>
      </div>
      <div class="cart" v-bind:style="{ display: cartDisplay}"> 
        <p class="cart-sum">Корзина = 0</p>
        <div class="cart-list">
          <div v-for="item in cart" :key="item.id_product" class="cart-item">
            <img src="https://picsum.photos/180/180" alt="товар">
            <h3>{{item.product_name}}</h3>
            <p>{{item.price}}</p>
            <p>{{item.quantity}}</p>
            <div class="cart-buttons">
              <button>+</button>
              <button>-</button>
              <button>Удалить</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// 1. Добавить значение searhLine и связать его с инпутом
// 2. Добавить метод который отфильтрует наш список filteredGoods на основе searchLine
// 3. isVisibleCart добавить и добавить кнопку Корзина, которая будет иметь обработчик,
// меняющий состояние переменной isVisibleCart (true/false)

// Задание со звездочкой реализовано в template

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

export default {
  data: () => ({
    goods: [],
    filteredGoods: [],
    searchLine: '', // Задание 1
    cart: [],
    isVisibleCart: false,
    cartDisplay: 'none',
    cartBtnClass: 'cart-button',
  }),
  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`)
  },
  watch: {
    searchLine() { // Задание 2
      const regexp = new RegExp(this.searchLine, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    },
  },
  methods: {
    cartBtn() { // Задание 3
      this.isVisibleCart = !this.isVisibleCart;
      if (this.isVisibleCart) {this.cartDisplay = ''}
      else {this.cartDisplay = 'none'}
    },
    makeGETRequest(url) {
      fetch(url)
        .then((data) => data.json())
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
        })
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
    changeItemInCart({target}, action) {
      const {id} = target.dataset;
      let index = this.checkItemInCart(+id);
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

.main {
  padding: 20px 100px;
}

.catalog {
  padding: 0 20px 20px 20px;
  background-color: #f0eec5;
}

.catalog p {
  font-size: 30px;
  text-align: center;
  padding: 20px;
}

.catalog-list {
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: (minmax(200px, 1fr))[auto-fill];
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;
}

.catalog-item {
  width: 200px;
  height: 400px;
  background-color: #bebebe;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr;
      grid-template-columns: 1fr;
  -ms-grid-rows: 200px auto auto 50px;
      grid-template-rows: 200px auto auto 50px;
}

.catalog-item img {
  width: 180px;
  height: 180px;
  margin: 10px;
}

.catalog-item h3 {
  -ms-flex-item-align: center;
      -ms-grid-row-align: center;
      align-self: center;
  -ms-grid-column-align: center;
      justify-self: center;
}

.catalog-item p {
  -ms-flex-item-align: center;
      -ms-grid-row-align: center;
      align-self: center;
  -ms-grid-column-align: center;
      justify-self: center;
}

.catalog-item button {
  border: 1px solid black;
  border-radius: 1rem;
  padding: 5px 10px;
  margin: 10px;
}

.catalog-item button:hover {
  cursor: pointer;
}

.catalog-item button:active {
  background-color: aqua;
}

.cart {
  padding: 0 20px 20px 20px;
  background-color: #d1f0dc;
}

.cart p {
  font-size: 30px;
  text-align: center;
  padding: 20px;
}

.cart-list {
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: (minmax(200px, 1fr))[auto-fill];
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;
}

.cart-item {
  width: 200px;
  height: 400px;
  background-color: #bebebe;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr;
      grid-template-columns: 1fr;
  -ms-grid-rows: 200px auto auto 50px;
      grid-template-rows: 200px auto auto 50px;
}

.cart-item img {
  width: 180px;
  height: 180px;
  margin: 10px;
}

.cart-item h3 {
  -ms-flex-item-align: center;
      -ms-grid-row-align: center;
      align-self: center;
  -ms-grid-column-align: center;
      justify-self: center;
}

.cart-item p {
  -ms-flex-item-align: center;
      -ms-grid-row-align: center;
      align-self: center;
  -ms-grid-column-align: center;
      justify-self: center;
}

.cart-item button {
  border: 1px solid black;
  border-radius: 1rem;
  padding: 5px 10px;
  margin: 10px;
}

.cart-item button:hover {
  cursor: pointer;
}

.cart-item button:active {
  background-color: aqua;
}
/*# sourceMappingURL=style.css.map */
</style>
