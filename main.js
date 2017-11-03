var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.json());
var port = 8080;
app.set('views', __dirname + '/pages');
app.set('view engine', 'ejs');


// create session store
var sessionHandler = require('./js/session_handler');
var store = sessionHandler.createStore();

// handler for cookie parse
app.use(cookieParser());
//create session
app.use(session({
    store: store,
    resave: false,
    saveUninitialized: true,
    secret: 'supersecret'
}));

var handlers = require('./js/queries');

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});

 app.get('/all', handlers.get_users);

app.post('/login', handlers.check_user);
app.post('/login', handlers.check_pass);



app.get('/check', function(req, res){
    if (req.session.username) {
        res.send('User ' + req.session.username + ' is logged in!');
    } else {
        res.send('Not logged in');
    }
})



app.listen(port, function(){
    console.log("App established connection on port " + port);
})