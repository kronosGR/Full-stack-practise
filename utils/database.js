// const mysql = require('mysql2');

// const pool = mysql.createPool({
// 	host: '172.21.192.1',
// 	user: 'root',
// 	database: 'node_complete',
// 	password: '123456',
//
// });

// module.exports = pool.promise();

// sequelize
// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node_complete', 'root', '123456', {
// 	dialect:'mysql',
// 	host: 'localhost'
// });

// module.exports = sequelize;

const mongodb = require('mongodb');

const mongoConnect = (callback) => {
  const MongoClient = mongodb.MongoClient;
  MongoClient.connect(
    'mongodb+srv://kronos:yxhI2XOMH63PzHrm@cluster0.hrnez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
    .then((client) => {
      console.log('Connected!');
			callback(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;