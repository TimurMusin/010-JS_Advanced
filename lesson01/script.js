const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];
// Задание 2. Добавил значения по умолчанию. Скоратил запись.
const renderGoodsItem = (title = 'товар', price = 0) => `<div class="goods-item"><img src="https://picsum.photos/180/180" alt="товар"><h3>${title}</h3><p>${price}</p><button>Добавить</button></div>`;

// Задание 3. Переделал вывод вместо массива в строку. Запятая была из-за того что выводили массив.
const renderGoodsList = (list) => {
    let goodsList = '';
    for (let key in list) {goodsList += renderGoodsItem(list[key].title, list[key].price)};
    document.querySelector('.goods-list').innerHTML = goodsList;
}

renderGoodsList(goods);