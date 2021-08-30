const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// EJS setup, and it does not support layouts
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");


app.use(bodyParser.urlencoded( {extended: false}));
app.use(express.static(path.join(__dirname, 'public' )));

app.use('/admin/', adminData.routes);
app.use(shopRoutes);


app.use((req, res) => {
  res.render('404', {
    pageTitle: 'Page not found',
  })
})



app.listen(3000);

// install 3 template engines
// npm install --save ejs pug express-handlebars