var port = 34520
var serverName = "http://flip3.engr.oregonstate.edu";

var sqlHost = 'classmysql.engr.oregonstate.edu';
//var sqlUser = 'cs340_benjamse';
//var sqlPassword = '4211';
//var sqlDb = 'cs340_benjamse';
var sqlUser = 'cs361_mccludav';
var sqlPassword = 'ramlah01';
var sqlDb = 'cs361_mccludav';

var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');

app.use(session({secret:'SuperSecretPassword'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

var pool = mysql.createPool({
  connectionLimit : 10,
  host  : sqlHost,
  user  : sqlUser,
  password: sqlPassword,
  database: sqlDb
});

// Set web server port
const args = process.argv;
if (args != null && args.length == 3) {
    port = args[2];
}

module.exports.pool = pool;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', port);
const request = require('request');

// Register handlebars helper ifeq
const hbars = handlebars.handlebars;

hbars.registerHelper('ifeq', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

hbars.registerHelper('ifgr', function(arg1, arg2, options) {
    return (arg1 > arg2) ? options.fn(this) : options.inverse(this);
});

hbars.registerHelper('iflt', function(arg1, arg2, options) {
    return (arg1 < arg2) ? options.fn(this) : options.inverse(this);
});


app.get('/', function(req, res, next) {
    // if user is already logged in, redirect request to homepage
    if (req.session.logged_in_username) {
        res.redirect('home');
    }
    else {
        res.render('login');
    }
});



app.get('/logout', function(req, res, next) {
    req.session.logged_in_username = undefined;
    req.session.logged_in_user_id = undefined;
    res.render('login');
    return;
});

// handle login and account creation requests
app.post('/', function(req, res, next) {
    var form_type = req.body.form_type;
    var context = {};

    if (form_type == "login_form") {
        var sqlStr = "SELECT u.id FROM fp_user u WHERE u.username = (?) AND u.password = (?)";
        var sqlArgs = [req.body.login_username, req.body.login_password];

        pool.query(sqlStr, sqlArgs, function(err, results) {
            if (err) {
                console.log(err);
                next(err);
                return;
            }

            // check if user credentials were found
            if (results[0]) {
                req.session.logged_in_username = req.body.login_username;
                req.session.logged_in_user_id = results[0].id;

                res.redirect('home');
                    return;
            } else {
                context.login_error = "Invalid username or password";
                res.render('login', context);
            }
        }); 
    }
});


app.post('/create_account', function(req, res, next) {
    var form_type = req.body.form_type;
    var context = {};
    var new_username = req.body.create_username;

    // if correct form was submitted
    if (form_type == "create_account_form") {
        var sqlStr = "SELECT u.id FROM fp_user u WHERE u.username = (?)";

        // check if username is already taken. SELECT by username
        pool.query(sqlStr, new_username, function(err, results) {
            if (err) {
                console.log(err);
                next(err);
                return;
            }

            // if username exists
            if (results[0]) {
                context.create_error = "Username is not available";
                res.render('login', context);
                return;
            }

            // otherwise, username is available. insert account info into db
            sqlStr = "INSERT INTO fp_user (username, password) VALUES (?, ?)";
            var sqlArgs = [new_username, req.body.create_password];

            pool.query(sqlStr, sqlArgs, function(err, result) {
                if (err) {
                    console.log(err);
                    next(err);
                    return;
                }

                // new username and password successfully inserted.
                // add to session, redirect user to home page
                req.session.logged_in_username = new_username;
                req.session.logged_in_user_id = result.insertId;;
                req.session.filter_sector = 0;
                res.redirect('/home');
            });
        });
    } else {
        context.alert = "Error occurred while creating account.";
        res.render('login', context);
    }
});


app.get('/home', function(req, res, next) {
    if (req.body.portfolio != null) {
        //req.session.portfolio_id = req.body.portfolio;
    }

    if (req.body.filterWatchlistMenu != null) {
        //req.session.filter_sector = req.body.filterWatchlistMenu;
    }

    // check if the user is logged in
    if (!req.session.logged_in_username) {
        // if not logged in, render login page
        res.render('login');
    } else {
        res.render('home');
    }
});

app.post('/home', function(req, res, next) {
    if (req.body.portfolio != null) {
        //req.session.portfolio_id = req.body.portfolio;
    }

    if (req.body.filterWatchlistMenu != null) {
        //req.session.filter_sector = req.body.filterWatchlistMenu;
    }

    // check if the user is logged in
    if (!req.session.logged_in_username) {
        // if not logged in, render login page
        res.render('login');
    } else {
		res.render('home');
    }
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on ' + serverName + ':' + app.get('port') + '; press Ctrl-C to terminate.');
});
