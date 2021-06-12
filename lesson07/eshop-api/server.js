// https://bezkoder.com/node-express-sequelize-postgresql/

const express = require('express')
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('Server started on 3000 port!')
})

app.get('/catalogData', (req, res) => {
  fs.readFile('./database/catalog.json', 'utf8', (err, data) => {
    res.send(data)
  })
})

app.get('/cartData', (req, res) => {
  fs.readFile('./database/cart.json', 'utf8', (err, data) => {
    res.send(data)
  })
})

app.post('/changeCart', (req, res) => {
  fs.readFile('./database/cart.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{ "result": 0 }')
    } else {
      fs.readFile('./database/stats.json', 'utf8', (err, stat) => {
        if (err) {
          res.send('{ "result": 0 }')
        } else {       
          const stats = JSON.parse(stat);
          const cart = JSON.parse(data);
          const item = req.body;
          
          changeItemInCart(item, cart, stats);
          
          fs.writeFile('./database/cart.json', JSON.stringify(cart), (err) => {
            if (err) {
              res.send('{"result": 0}');
            } else {
              res.send('{"result": 1}');
            }
          })
          fs.writeFile('./database/stats.json', JSON.stringify(stats), (err) => {
            if (err) throw err;
            let data = fs.readFileSync('./database/stats.json', "utf8");
          })
        }
      })
    }
  })
})

// Задание 1, 2 - Функция изменяющая товар в корзине в зависимости от нажатой кнопки
function changeItemInCart(item, cart, stats) {
  setStat(stats, item.action, item.product_name);
  let index = checkItemInCart(item.product_id, cart);
  switch (item.action) {
    case 'add':
      if (index !== false) {
        cart[index].quantity++;
      } else {
        delete item.action;
        item['quantity'] = 1;
        cart.push(item);
      }
      break;
    case 'plus':
      cart[index].quantity++;
      break;
    case 'minus':
      if (cart[index].quantity === 1) {
        cart.splice(index, 1);
      } else {
        cart[index].quantity--;
      };
      break;
    case 'del':
      cart.splice(index, 1);
  };
  return cart, stats;
}

function checkItemInCart(id, cart) {
  let exist = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product_id === id) {
      exist = true;
      return i;
      }
  }
  if (!exist) return exist
}

// Задание * - функция записывающая событие
function setStat(stats, action, product) {
  Data = new Date();
  switch (action) {
    case 'add':
      stats.push({
        "action": 'Добавление',
        "product": product,
        "time": `${Data.getHours()}:${Data.getMinutes()}:${Data.getSeconds()}`
      });
      break;
    case 'plus':
      stats.push({
        "action": 'Увелечение кол-ва',
        "product": product,
        "time": `${Data.getHours()}:${Data.getMinutes()}:${Data.getSeconds()}`
      });
      break;
    case 'minus':
      stats.push({
        "action": 'Уменьшение кол-ва',
        "product": product,
        "time": `${Data.getHours()}:${Data.getMinutes()}:${Data.getSeconds()}`
      });
      break;
    case 'del':
      stats.push({
        "action": 'Удаление',
        "product": product,
        "time": `${Data.getHours()}:${Data.getMinutes()}:${Data.getSeconds()}`
      });
      break;
  }
  return stats;
}
