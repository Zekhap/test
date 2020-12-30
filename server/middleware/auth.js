const jwt = require("jsonwebtoken");
const config = require("../config/config");
const db = require("../models");
const userService = require("../user/user.service");

exports.verifyToken = (req, res, next) => {//module.exports.verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];

    userService.validateToken(token, req.connection.remoteAddress).then(result => {
        if(result.success == 0) {
            return res.status(401).send(result);
        }
        req.account = result.account;

        //Get all perms
        db.query('SELECT UserGroup.group, GroupPermission.permission, Group.weight, GroupPermission.value '+
            'FROM UserGroup '+
            'JOIN GroupPermission ON UserGroup.group = GroupPermission.name '+
            'JOIN `Group` ON UserGroup.group = Group.name '+
            'WHERE UserGroup.uuid = ?', [result.account.id]).then(results => {
                if(!results || results.length == 0) {
                    req.account.permissions = [];
                    next();
                } else {
                    req.account.permissions = results;
                    next();
                }
        }).catch(err => {
            console.log(err);
        });
    });
};