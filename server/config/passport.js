/**
 * Created by sebastian.weikart on 18/03/2015.
 */
var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User');
module.exports = function() {

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

}