const mysql = require("mysql2");
const config = require("../config/config");
var db = null;

module.exports = {
    query,
    close,
    connect
}
function connect() {
    db = mysql.createConnection({
        host: config.db.host,
        user: config.db.user,
        password: config.db.pass,
        database: config.db.database,
        multipleStatements: true
    });
    return new Promise((resolve, reject) => {
        db.connect((error) => {
            if(error) {
                return reject(error);
            }
            console.log("MySQL Connected...");
            return resolve();
        });
    });
}

function query(sql, args) {
    return new Promise( (resolve, reject) => {
        db.query(sql, args, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        } );
    });
}
function close() {
    return new Promise((resolve, reject) => {
        db.end(err => {
            if (err) return reject(err);
            resolve();
        });
    });
}