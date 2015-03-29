/**
 * Created by sebastian.weikart on 15/03/2015.
 */
var passport = require('passport');
module.exports.authenticate =  function(req, res, next) {
    req.body.username = req.body.username.toLocaleLowerCase();
    console.log('request for /login with request ' +req.body.username);
    var auth = passport.authenticate('local', function(err, user) {
        if(err) {
            console.log('some error happened while authenticating...');
            return next(err);
        }
        if(!user) {
            console.log('no user found to authenticate');
            return res.send({success:false});


        }
        console.log('some user was found.. ' + user);
        req.logIn(user, function(err){
            if(err) {
                console.log('some error happened while authenticating...' + err);
                return next(err);
            }
            user.salt = "";  //TODO remove salt for security - find better way to do it in the future
            return res.send({success:true, user: user});
        })
        console.log('calling auth...');
    });
    auth(req, res, next);

},

exports.requiresApiLogin = function(req, res, next) {
    if(!req.isAuthenticated()) {
        res.status(403);
        res.end();
    } else {
        next();
    };
},

exports.requiresRole = function(role) {
    return function(req, res, next) {
        if(!req.isAuthenticated() || req.user.roles.indexOf(role)=== -1) {
            res.status(403);
            res.end();
        } else {
            next();
        }
    }

}