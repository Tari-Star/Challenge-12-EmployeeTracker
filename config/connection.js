const mysql = require('mysql2');

require('dotenv').config();

// create connection to our database , pass in your MySQL information for username and password
const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PW,
    database: 'company'
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;