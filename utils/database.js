const mysql = require('mysql2');

const pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	database: 'nede_complete',
	password: 'ioannis1978',
});

module.exports = pool.promise();
