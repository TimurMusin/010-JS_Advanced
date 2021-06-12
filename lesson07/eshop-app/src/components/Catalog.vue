<template>
  <div class="catalog">
    <h1>Каталог</h1>
    <div class="catalog-list">
      <h3 v-if="goods.length === 0">Каталог пуст</h3>
      <div v-for="item in goods" :key="item.product_id" class="catalog-item">
        <img src="https://picsum.photos/180/180" alt="товар">
        <h3>{{item.product_name}}</h3>
        <p>{{item.price}}</p>
        <button @click="clickAdd(item, 'add')">Добавить</button> 
        <!-- <button @click="clickAdd(item)">Добавить</button>  -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Array,
      default: () => [],
    }
  },
  methods: {
    clickAdd(item, action) {
      this.$emit('callChangeCart', item, action);
    }
  }
}
</script>

<style scoped>
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
</style>