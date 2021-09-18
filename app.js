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

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin/', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// creates tables for all the defined models
sequelize
	.sync()
	.then((result) => {
    // console.log(result);
    app.listen(3000);
	})
	.catch((err) => {
		console.log(err);
	});


// install 3 template engines
// npm install --save ejs pug express-handlebars
