const userService = require("../user/user.service");

exports.login = async (req, res, next) => {
    const {username, password} = req.body;

    userService.login(username, password).then(result => {
        if(result.success == 0) {
            return res.status(401).send({success: 0, token: null, message: result.message});
        } else {
            var response = {
                id: result.account.id,
                username: result.account.username
            }
            userService.generateJwtToken({id: result.account.id, username: result.account.username, ip: req.connection.remoteAddress}).then((token) => {
                response.token = token;
                return res.status(200).send(response);
            });
        }
    }).catch(next);
}

exports.refresh = async (req, res) => {
    let token = req.headers["authorization"];
    userService.validateToken(token, req.connection.remoteAddress).then(result => {
        if(result.success == 0) {
            return res.status(401).send(result);
        }
        req.account = result.account;

        var response = {
            id: result.account.id,
            username: result.account.username
        }
        userService.generateJwtToken({id: result.account.id, username: result.account.username, ip: result.account.ip}).then((token) => {
            response.token = token;
            return res.status(200).send(response);
        });
    });
}
exports.hasPermission = (permissions, permission) => {
    let permit = false;

    var weight = 9999;
    for (var i = 0; i < permissions.length; i++) {
        let element = permissions[i];

        if(element.permission == "*") {
            permit = true;
            break;
        }
        if(permission == element.permission) {
            if(weight > element.weight) {
                weight = element.weight;
                permit = (element.value == 1) ? true : false;
            }
        }
    }
    return permit;
}
//Can check right now
//*
//permission.node
//TODO: Add checks for stars blablabla.*
exports.permission = (permission) => {
    return (req, res, next) => {
        let permit = false;
        if(req.account.hasOwnProperty("permissions")) {
            let permissions = req.account.permissions;
            var weight = 9999;
            for (var i = 0; i < permissions.length; i++) {
                let element = permissions[i];
                
                if(element.permission == "*") {
                    permit = true;
                    break;
                }
                if(permission == element.permission) {
                    if(weight > element.weight) {
                        weight = element.weight;
                        permit = (element.value == 1) ? true : false;
                    }
                }
            }
        }
        if(permit) {
            next();
        } else {
            return res.status(401).send({success: 0, message: "Permission denied!"});
        }
    }
}
