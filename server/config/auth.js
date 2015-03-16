/**
 * Created by sebastian.weikart on 15/03/2015.
 */
var passport = require('passport');
module.exports.authenticate =  function(req, res, next) {
    console.log('request for /login with request ' + req.params.username);
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
            user.salt = "";  //remove salt - find better way to do it in the future
            return res.send({success:true, user: user});
        })
        console.log('calling auth...');
    });
    auth(req, res, next);

}