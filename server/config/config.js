const fs = require('fs');

function buildConfig() {
    let config = {
        "jwt": {
            "expires": 500,
            "secret": "SeCrEtKeYfOrHaShInG"
        },
        "port": 3000,
        "db": {
            "host": "81.231.10.41",
            "user": "u6_0RV0RaeBjL",
            "pass": "mjbi6Su^@@h56.ksbNW48st!",
            "database": "s6_ForgottenNetwork",
            "dialect": "mysql",
            "pool": {
                "max": 5,
                "min": 0,
                "acquire": 30000,
                "idle": 10000
            }
        },
        "ssl": {
            "enabled": false,
            "key": "server.key",
            "cert": "server.cert"
        }
    }
    if(config.ssl.enabled) {
        config.isHttps = isHttps(config);
        if(config.isHttps) {
            config = loadCertificateFiles(config);
        }
    } else { config.isHttps = false; }
    return config;
}

function isHttps(config) {
    return config.ssl.key>'' && config.ssl.cert>''
}

function loadCertificateFiles(config) {
    // load https certs file content
    if (config && config.ssl) {
        ['key', 'cert'].forEach(key => {
        if (config.ssl[key]) {
            let file = config.ssl[key];
            config.ssl[key] = fs.readFileSync(file);
        }
        });
    }
    return config;
}
const config = buildConfig();
module.exports = config;