const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

// EJS setup, and it does not support layouts
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.user(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
  })
);

const errorController = require('./controllers/error');
const User = require('./models/user');

// get the dummy user for epxiremental use
app.use((req, res, next) => {
  User.findById('616667f9dedd8e83438e7ceb')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use('/admin/', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);
// install 3 template engines
// npm install --save ejs pug express-handlebars

mongoose
  .connect(
    'mongodb+srv://kronos:yxhI2XOMH63PzHrm@cluster0.hrnez.mongodb.net/Shop?retryWrites=true&w=majority'
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Kronos',
          email: 'kronos@kronos.kronos',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => console.log(err));
