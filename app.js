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
const mongoConnect = require('./utils/database').mongoConnect;
const User = require('./models/user');

app.use(express.static(path.join(__dirname, 'public')));

// get the dummy user for epxiremental use
app.use((req, res, next) => {
  User.findById("615adf456107af75d38f2def")
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

app.use(errorController.get404);
// install 3 template engines
// npm install --save ejs pug express-handlebars

mongoConnect(() => {  
  app.listen(3000);
});
