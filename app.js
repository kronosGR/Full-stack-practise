const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// EJS setup, and it does not support layouts
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");


app.use(bodyParser.urlencoded( {extended: false}));

const errorController = require('./controllers/error');

// test DB
const db= require('./utils/database');

db.execute('SELECT * FROM products')
.then((result)=>{
  console.log(result);
})
.catch((err)=>{
  console.log(err);
});

app.use(express.static(path.join(__dirname, 'public' )));

app.use('/admin/', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404 );

app.listen(3000);

// install 3 template engines
// npm install --save ejs pug express-handlebars