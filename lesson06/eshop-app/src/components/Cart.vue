<template>
  <div class="cart" :style="{ display: cartDisplay}"> 
    <h1 class="cart-sum">Корзина = {{ cartSum }}</h1>
    <div class="cart-list">
      <div v-for="item in cart" :key="item.id_product" class="cart-item">
        <img src="https://picsum.photos/180/180" alt="товар">
        <h3>{{item.product_name}}</h3>
        <p>{{item.price}}</p>
        <p>{{item.quantity}}</p>
        <div class="cart-buttons">
          <button @click="clickBtn(item.id_product, 'plus')">+</button>
          <button @click="clickBtn(item.id_product, 'minus')">-</button>
          <button @click="clickBtn(item.id_product, 'del')">Удалить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cart: {
      type: Array,
      default: () => [],
    },
    cartSum: {
      type: Number,
      default: () => 0,
    },
    cartDisplay: {
      type: String,
      default: () => '',
    }
  },
  methods: {
    clickBtn(id, action) {
      this.$emit('callChangeItemInCart', id, action);
    }
  }
}
</script>

<style scoped>
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
</style>