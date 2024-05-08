const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    waitForConnections: false,
    connectionLimit: 10,
    queueLimit: 0,
    database: 'bazma_jwt_auth'
});


connection.connect((err) => {
    if (err) throw err;
    console.log('Terhubung ke database MySQL!');
});

module.exports= connection;