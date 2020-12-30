const db = require("../models");
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

module.exports = {
    login,
    getAll,
    getById,
    update,
    validatePassword,
    hashPassword,
    validateToken,
    generateJwtToken,
    generateRefreshToken
}

async function login(username, password) {
    if(!username || !password) {
        return resolve({success: 0, message: "Invalid credentials."});
    }
    return new Promise((resolve, reject) => {
        db.query('SELECT User.id, User.username, Web_User.password FROM User JOIN Web_User ON User.id = Web_User.userid WHERE User.username = ?', [username]).then(results => {
            
            if(!results || results.length == 0) {
                return resolve({success: 0, message: "Invalid credentials."});
            }
            let result = results[0];
    
            if(result.password == null) {
                return resolve({success: 0, message: "Invalid credentials."});
            }

            if(!validatePassword(password, result.password)) {
                return resolve({success: 0, message: "Invalid credentials."});
            }

            let account = {id: result.id, username: result.username};
            return resolve({success: 1, account: account});
        }).catch(err => {
            console.log(err);
        });
    });
}

async function getAll() {

}

async function getById(id) {
    return await getUser(id);
}

async function update() {

}


// Helper

async function getUser(id) {
    db.query('SELECT * FROM User WHERE id = ?', [id], async (error, results) => {
        if(!results || results.length == 0) return {account: []};
        return {account: results[0]};
    });
}
async function hashPassword(password) {
    return bcrypt.hashSync(password + config.jwt.secret, 14);
}

async function validatePassword(password, hash) {
    return bcrypt.compareSync(password + config.jwt.secret, hash);
}

async function validateToken(token, ip) {
    return new Promise((resolve, reject) => {
        if (!token) {
            return resolve({success: 0, message: "Invalid token."});
        }
        token = token.slice(7);
        jwt.verify(token, config.jwt.secret, (err, decoded) => {
            if (err) {
                return resolve({success: 0, message: "Invalid token."});
            }
            if(decoded.payload.ip != ip) {
                return resolve({success: 0, message: "Invalid token."});
            }
            return resolve({success: 1, account: decoded.payload});
        });
    });
}




async function generateJwtToken(payload) {
    return new Promise((resolve, reject) => {
        return resolve(jwt.sign({payload}, config.jwt.secret, {expiresIn: config.jwt.expires}));
    });
}
async function generateRefreshToken() {
    const token = new Date().getTime().toString();
     // add token cookie that expires in 7 days
     const expires = new Date(Date.now() + 7*24*60*60*1000).toUTCString();
     document.cookie = `fakeRefreshToken=${token}; expires=${expires}; path=/`;

     return token;
}