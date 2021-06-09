class Hamburger {
    constructor(sizes, toppings) {
        this.sizesList = sizes;
        this.toppingsList = toppings;
        this.size = [];
        this.stuffing = [];
    }

    getSizesList() { // Получить список возможных бургеров
        console.log('Список бургеров:');
        this.sizesList.forEach((item, index) => console.log(`${index} - ${item.name}, цена: ${item.price}, калорийность: ${item.calories}`));
    }

    getToppingsList() { // Получить список добавок
        console.log('Список добавок:');
        this.toppingsList.forEach((item, index) => console.log(`${index} - ${item.name}, цена: ${item.price}, калорийность: ${item.calories}`));
    }

    chooseSize(sizeIndex) { // Выбор размера бургера, получаем индекс из sizesList
        this.size = this.sizesList[sizeIndex];
        console.log(`Выбран бургер - ${this.sizesList[sizeIndex].name}`);
    }

    addTopping(toppingIndex) { // Добавить добавку, получаем индекс из toppingsList
        this.stuffing.push(this.toppingsList[toppingIndex]);
        console.log(`Добавлено - ${this.toppingsList[toppingIndex].name}`);
    }

    removeTopping(stuffingIndex) { // Убрать добавку, получаем индекс из stuffing
        console.log(`Убрано - ${this.stuffing[stuffingIndex].name}`);
        this.stuffing.splice(stuffingIndex, 1);
    }

    getSize() { // Узнать выбранный размер гамбургера
        console.log(`Выбранный бургер - ${this.size.name}`);
    }

    getStuffing() { // Узнать начинку гамбургера
        console.log('Начинка бургера:');
        this.stuffing.forEach((item, index) => console.log(`${index} - ${item.name}`));
    }

    calculatePrice() { // Узнать цену
        console.log('Стоимость гамбургера:');
        let sum = this.size.price;
        this.stuffing.forEach(item => sum += item.price);
        console.log(sum);
    }

    calculateCalories() { // Узнать калорийность
        console.log('Калорийность гамбургера:');
        let sum = this.size.calories;
        this.stuffing.forEach(item => sum += item.calories);
        console.log(sum);
    }
};

const sizeList = [
    {name: 'Маленький', price: 50, calories: 20},
    {name: 'Большой', price: 100, calories: 40},
];

const toppingList = [
    {name: 'Сыр', price: 10, calories: 20},
    {name: 'Салат', price: 20, calories: 5},
    {name: 'Картофель', price: 15, calories: 10},
    {name: 'Приправа', price: 15, calories: 0},
    {name: 'Майонез', price: 20, calories: 5},
];

const burger = new Hamburger(sizeList, toppingList);