const mysql = require('mysql2');

const pool = mysql.createPool({
	host: '172.21.192.1',
	user: 'root',
	database: 'node_complete',
	password: '123456',
});


module.exports = pool.promise();

