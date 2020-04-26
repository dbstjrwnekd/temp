var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'bookAdmin',
    password : '123456zz',
    port : 3306,
    database : 'bookjuck'
});

module.exports = connection;