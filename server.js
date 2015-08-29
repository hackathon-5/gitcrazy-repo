var express        = require('express');
var app            = express();
var session        = require('express-session');
var methodOverride = require('method-override');
var config         = require('./config');
var port           = 3000;
var flash          = require('connect-flash');
var morgan         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({ secret: 'thisismysecret' }));
app.use(flash());

app.use(express.static(__dirname + '/app'));

require('./api/routes.js')(app);

app.listen(port);

console.log('App running on ' + port);

exports = module.exports = app;
