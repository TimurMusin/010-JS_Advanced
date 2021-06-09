// https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses – адрес API;
// /catalogData.json – получить список товаров;
// /getBasket.json – получить содержимое корзины;
// /addToBasket.json – добавить товар в корзину;
// /deleteFromBasket.json – удалить товар из корзины.
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Задание 1. Переделайте makeGETRequest() так, чтобы она использовала промисы.

function makeGETRequest(url, callback) {
    let xhr;
    
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    const promise = new Promise((res) => { //Надеюсь правильно понял задание, только в данном примере не очень понятно зачем :)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                res(xhr.responseText);
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    })

    promise.then(callback);
}


class GoodsItem {
    constructor(product_name, price) {
        this.product_name = product_name;
        this.price = price;
    }

    render() {
        return `<div class="goods-item"><img src="https://picsum.photos/180/180" alt="товар"><h3>${this.product_name}</h3><p>${this.price}</p><button>Добавить</button></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            cb();
        })
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

// Задание 2. Добавьте в соответствующие классы методы добавления товара в корзину,
// удаления товара из корзины и получения списка товаров корзины.

// не стал пока завязывать функции на кнопки, проверял через консоль.
// в качестве параметра для определения товара использовал конкретный обьъект из массива каталога,
// по хорошему должно работать на id от страницы.

class Cart {
    constructor() {
        this.items = [];
    }

    getIndexOfGood(good) { //Определение индекса товара в корзине.
        let exist = false;
        for (let i = 0; i < this.items.contents.length; i++) {
            if (this.items.contents[i].id_product === good.id_product) {
                exist = true;
                return i;
            }
        }
        if (!exist) return exist
    }

    addItemToCart(good) { // Добавление товара из каталога в корзину, в случае наличия такого - увелечение кол-ва.
        let index = this.getIndexOfGood(good);
        console.log(index);
        if (index !== false) {
            this.items.contents[index].quantity++;
            console.log('true');
        } else {
            this.items.contents.push(good);
            this.items.contents[this.items.contents.length - 1].quantity = 1;
            console.log('false');
        }
        this.render();
    }

    changeItemQuantity(good, action) { // Изменение товара в корзине в зависимости от получаемого события.
        let index = this.getIndexOfGood(good);
        switch (action) {
            case 'plus':
                this.items.contents[index].quantity++;
                break;
            case 'minus':
                if (this.items.contents[index].quantity === 1) {
                    this.items.contents.splice(index, 1);
                } else {
                    this.items.contents[index].quantity--;
                }
                break;
            case 'delete':
                this.items.contents.splice(index, 1);
        }
        this.render();
    }

    countCartItemsSum() { // Подсчёт суммы товаров в корзине.
        let sum = 0;
        this.items.contents.forEach(item => sum += item.price * item.quantity);
        document.querySelector('.cart-sum').innerHTML = `Корзина: ${sum}`;
    }

    fetchGoods(cb) { // запрос текущей корзины с api.
        makeGETRequest(`${API_URL}/getBasket.json`, (goods) => {
            this.items = JSON.parse(goods);
            cb();
        })
    }

    render() { // Отрисовка корзины в html.
        let listHtml = '';
        this.items.contents.forEach(good => {
            const cartItem = new CartItem(good.product_name, good.price, good.quantity);
            listHtml += cartItem.render();
        });
        document.querySelector('.cart-list').innerHTML = listHtml;
        this.countCartItemsSum();
    }
}

class CartItem {
    constructor(product_name, price, quantity) {
        this.product_name = product_name;
        this.price = price;
        this.quantity = quantity;
    }
    render() {
        return `<div class="goods-item"><img src="https://picsum.photos/180/180" alt="товар"><h3>${this.product_name}</h3><p>${this.price}</p><p>${this.quantity}</p><div class = cart-buttons><button class = cart-plus>+</button><button class = cart-minus>-</button><button class = cart-delete>Удалить</button></div></div>`;
    }
}

const list = new GoodsList();
list.fetchGoods(() => {
    list.render();
});

const cart = new Cart();
cart.fetchGoods(() => {
    cart.render();
    cart.countCartItemsSum();
});