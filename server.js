var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;




var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

var User = mongoose.model('User');
passport.use(new LocalStrategy(
        function(username, password, done) {
            console.log('trying to find user ' + username);
            User.findOne({userName: username}).exec(function (err, user) {
                if (user && user.authenticate(password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
        }
));

passport.serializeUser(function(user, done) {
    console.log('serializing user..');
    if(user) {
        console.log('serializing user with ID ' + user._id);
        done(null, user._id);
    }
});

passport.deserializeUser(function(id, done) {
    console.log('deserializing user with ID ' + id);
    User.findOne({_id:id}).exec(function(err, user) {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }

    });

});


require('./server/config/routes')(app);





var port = config.port;

app.listen(port);

console.log("server is listening on port " + port + " ....");