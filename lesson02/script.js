class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `<div class="goods-item"><img src="https://picsum.photos/180/180" alt="товар"><h3>${this.title}</h3><p>${this.price}</p><button>Добавить</button></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ]
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    // Задание 2.
    countListSum() {
        let sum = 0;
        this.goods.forEach(good => sum += good.price);
        document.querySelector('.cart-button').innerHTML = `Корзина: ${sum}`
    }
    // Задание 2.
}

// Задание 1.
class Cart {
    constructor(item, count) {
        this.item = item;
        this.count = count;
    }

    addItemToCart() {}

    deleteItemFromCart() {}

    countCartItemsSum() {}

    render() {}
}

class CartItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    render() {}
}
// Задание 1.

const list = new GoodsList();
list.fetchGoods();
list.render();
list.countListSum();
