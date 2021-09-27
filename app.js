const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// EJS setup, and it does not support layouts
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

const errorController = require('./controllers/error');
const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

app.use(express.static(path.join(__dirname, 'public')));

// get the dummy user for epxiremental use
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      // store the user to the req for future use
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use('/admin/', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// declares the user has many products and onDelete delete in depth
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// not important to have
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// creates tables for all the defined models
sequelize
  //.sync({ force: true }) //forces to overwrite the table, not good for production
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'kronos', email: 'test@test.com' });
    }
    return Promise.resolve(user);
  })
  .then((user) => {
    // console.log(user)
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// install 3 template engines
// npm install --save ejs pug express-handlebars
