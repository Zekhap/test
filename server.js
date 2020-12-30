/* =======================
    LOAD THE DEPENDENCIES
==========================*/
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const requestIp = require('request-ip');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const config = require('./server/config/config');
const { port, isHttps, cert, key } = config;

/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express();

//Setup cors
var corsOption = {
    origin: 'http://localhost:4200',
    //methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //credentials: true,
    //exposedHeaders: ['x-auth-token']
    optionsSuccessStatus: 200
  };
app.use(cors(corsOption));

// parse JSON and url-encoded query
app.use(cookieParser(config.jwt.secret, { httpOnly: true }));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(compression());
app.use(requestIp.mw());

/* =======================
    CSRF CONFIGURATION
==========================*/
const cookieOptions = {
    key: 'XSRF-TOKEN',
    secure: false,
    httpOnly: false,
    maxAge: 3600
  }
app.use(csrf({ cookie: cookieOptions }));

//Error Handling
app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
    res.status(401).send({success: 0, message: "Invalid csrf."});
})
// configure api router
//app.use('/api', require('./server/routes'));

const router = express.Router();

app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    //res.header(
        //"Access-Control-Allow-Headers",
        //"Authorization, Origin, Content-Type, Accept"
    //);
    //res.csrf = req.csrfToken();
    next();
});


router.post('/user/email', function (req, res) {
    console.log('post incomming');
    console.log('req', req.body);
    res.send('testing..');
  });

/* =======================
    LOAD SOCKET
==========================*/
const http = require('http');
const io = require('socket.io')(http);

//io.on('connection', (socket) => {
//    console.log('a user connected');
//    socket.on('disconnect', () => {
//        console.log('user disconnected');
//    });
//});
const db = require("./server/models");
db.connect().then(() => {
    //Success
    if(isHttps) {
        const credentials = {key, cert};
        const server = http.createServer(credentials, app);
        server.listen(port);
        console.log(`HTTPS server listening at port ${port}`);
    } else {
        const server = http.createServer(app);
        server.listen(port);
        console.log(`HTTP server listening at port ${port}`);
    }
}).catch(error => {
    console.log("Failed to connect to MySQL");
    console.log("Message: " + error.sqlMessage);
    console.log("Code: " + error.code);
});