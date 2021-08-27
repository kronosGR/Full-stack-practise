const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const expressHbs = require("express-handlebars");

const app = express();

// register handlebars template engine and set the default layouts directory
app.engine('hbs', expressHbs({
  layoutsDir: 'views/layouts/',
  defaultLayout: 'main-layout',
  extname: 'hbs'
}));
app.set('view engine', 'hbs');
// not important for pug
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