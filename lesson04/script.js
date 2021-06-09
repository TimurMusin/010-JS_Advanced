// https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses – адрес API;
// /catalogData.json – получить список товаров;
// /getBasket.json – получить содержимое корзины;
// /addToBasket.json – добавить товар в корзину;
// /deleteFromBasket.json – удалить товар из корзины.

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const makeGETRequest = (url, callback) => {
    return new Promise((resolve, reject) => {
        let xhr;
        
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) { 
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) callback(xhr.responseText)
                else reject('Error')
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    })
}


class CatalogItem {
    constructor(id_product, product_name, price) {
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
    }

    render() {
        let data = {
            id_product: this.id_product,
            product_name: this.product_name,
            price: this.price,
        };

        data = JSON.stringify(data);

        return `<div class="catalog-item">
                    <img src="https://picsum.photos/180/180" alt="товар">
                    <h3>${this.product_name}</h3>
                    <p>${this.price}</p>
                    <button data-product='${data}' id='add-btn-${this.id_product}'>Добавить</button>
                </div>`;
    }
}

class Catalog {
    _cart = new Cart();

    constructor() {
        this.goods = [];
        this.filteredGoods = [];
    }

    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
            cb();
        })
    }

    filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        this.render();
    }

    render() {
        let listHtml = '';
        this.filteredGoods.forEach(good => {
            const goodItem = new CatalogItem(good.id_product, good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.catalog-list').innerHTML = listHtml;
        this._cart.setAddListeners(this.filteredGoods);
    }
}

class CartItem {
    constructor(id_product, product_name, price, quantity) {
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
        this.quantity = quantity;
    }

    render() {
        return `<div class="catalog-item">
                    <img src="https://picsum.photos/180/180" alt="товар">
                    <h3>${this.product_name}</h3>
                    <p>${this.price}</p>
                    <p>${this.quantity}</p>
                    <div class = cart-buttons>
                        <button data-id='${this.id_product}' id='plus-btn-${this.id_product}' class = cart-plus>+</button>
                        <button data-id='${this.id_product}' id='minus-btn-${this.id_product}' class = cart-minus>-</button>
                        <button data-id='${this.id_product}' id='delete-btn-${this.id_product}' class = cart-delete>Удалить</button>
                    </div>
                </div>`;
    }
}

class Cart {
    constructor() {
        this.items = [];
    }

    clearAll() {
        this.items = [];
        this.render();
    }

    checkItemInCart(id) {
        let exist = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id_product === id) {
                exist = true;
                return i;
            }
        }
        if (!exist) return exist
    }

    addItemToCart({target}) {
        const {product = {}} = target.dataset; // нельзя передать датасет сразу?
        let productObj = JSON.parse(product)
        let index = this.checkItemInCart(productObj.id_product);
        if (index !== false) {this.items[index].quantity++}
        else {
            productObj['quantity'] = 0;
            this.items.push(productObj);
            this.items[this.items.length - 1].quantity = 1;
        }
        this.render();
    }

    changeItemInCart({target}, action) {
        const {id} = target.dataset;
        let index = this.checkItemInCart(+id);
        switch (action) {
            case 'plus':
                this.items[index].quantity++;
                break;
            case 'minus':
                if (this.items[index].quantity === 1) {
                    this.items.splice(index, 1);
                } else {
                    this.items[index].quantity--;
                }
                break;
            case 'del':
                this.items.splice(index, 1);
        }
        this.render();
    }

    setAddListeners(list = []) {
        list.forEach((item) => {
            document.getElementById(`add-btn-${item.id_product}`).addEventListener('click', (e) => this.addItemToCart(e));
        })
    }

    setDeleteListeners() {
        this.items.forEach((item) => {
            document.getElementById(`delete-btn-${item.id_product}`).addEventListener('click', (e) => this.changeItemInCart(e, 'del'));
        })
    }

    setMinusListeners() {
        this.items.forEach((item) => {
            document.getElementById(`minus-btn-${item.id_product}`).addEventListener('click', (e) => this.changeItemInCart(e, 'minus'));
        })
    }

    setPlusListeners() {
        this.items.forEach((item) => {
            document.getElementById(`plus-btn-${item.id_product}`).addEventListener('click', (e) => this.changeItemInCart(e, 'plus'));
        })
    }

    countCartItemsSum() {
        let sum = 0;
        this.items.forEach(item => sum += item.price * item.quantity);
        document.querySelector('.cart-sum').innerHTML = `Корзина: ${sum}`;
    }

    render() {
        let listHtml = '';
        this.items.forEach(item => {
            const cartItem = new CartItem(item.id_product, item.product_name, item.price, item.quantity);
            listHtml += cartItem.render();
        });
        document.querySelector('.cart-list').innerHTML = listHtml;
        this.countCartItemsSum();
        this.setDeleteListeners();
        this.setMinusListeners();
        this.setPlusListeners();
    }
}

const catalog = new Catalog();
catalog.fetchGoods(() => {
    catalog.render();
});

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keydown', (e) => {
    const value = searchInput.value;
    catalog.filterGoods(value);
});