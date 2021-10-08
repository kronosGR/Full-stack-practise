const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// EJS setup, and it does not support layouts
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

const errorController = require('./controllers/error');
// const User = require('./models/user');

app.use(express.static(path.join(__dirname, 'public')));

// get the dummy user for epxiremental use
// app.use((req, res, next) => {
//   User.findById('615db7096107af75d38f2e01')
//     .then((user) => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.use('/admin/', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
// install 3 template engines
// npm install --save ejs pug express-handlebars

mongoose
  .connect(
    'mongodb+srv://kronos:yxhI2XOMH63PzHrm@cluster0.hrnez.mongodb.net/Shop?retryWrites=true&w=majority'
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
