const db = require("../models");
const authController = require("./auth.controller");

function deleteIfNoPerms(permissions, permission, server, ...value) {
    if(!authController.hasPermission(permissions, permission)) {
        value.forEach(k => {
            delete server[k];
        });
    }
}

exports.getServers = async (req, res) => {
    
    db.query('SELECT * FROM Server').then(results => {

        results.forEach(server => {
            deleteIfNoPerms(req.account.permissions, "website.resource.server.socket", server, "socket_key", "socket_port", "socket_host", "socket_auto");
        });

        return res.status(200).send({success: 1, result: results});
    }).catch(err => {
        console.log(err);
    });
};