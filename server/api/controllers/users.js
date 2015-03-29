/**
 * Created by sebastian.weikart on 18/03/2015.
 */

var User = require('mongoose').model('User'),
    crypto = require('../../common/crypto/crypto');

exports.getUsers = function(req, res) {
    User.find({}).exec(function (err, collection) {
        res.send(collection);
    })
};

exports.createUser = function(req, res, next) {
    var userData = req.body;

    userData.username = userData.userName.toLocaleLowerCase();
    userData.salt =crypto.createSalt();
    userData.hashed_pwd =crypto.hashPwd( userData.salt, userData.password);

    User.create(userData, function(err, user) {
       if(err) {
           if(err.toString().indexOf('E11000') > -1) {
               err = new Error('Duplicate Username');
           }
           res.status(400);
           return res.send({reason: err.toString()});
       };

        req.logIn(user, function(err) {
            if(err) { return next(err)};
            return res.send(user);
        });
    });
};

exports.updateUser = function(req, res, next) {
    var userUpdates = req.body;
    console.log('update user request for current user with ' + userUpdates._id);
    console.log('current logged in user id is ' + req.user._id);
    console.log('same ID? ' + req.user._id.equals(userUpdates._id));   // req.user_id is not a string but an ObjectId type
    if(!req.user._id.equals(userUpdates._id) && !req.user.hasRole('admin')) {
        res.status(403);
        return res.send({reason: 'attempt to update another user then the currently logged in one - not allowed'});
        // TODO investigate res.send vs. res.end
    } else
    if (req.user._id.equals(userUpdates._id)) {
        req.user.firstName = userUpdates.firstName;
        req.user.lastName = userUpdates.lastName;
        req.user.userName = userUpdates.userName;
        if(userUpdates.password && userUpdates.password.length > 0) {
            req.user.salt =crypto.createSalt();
            req.user.hashed_pwd =crypto.hashPwd( req.user.salt, userUpdates.password);
        }
        req.user.save(function(err) {
            if(err) {
                console.log('error occured ' + err);
                res.status(400);
                return res.send({reason: err.toString()});
            }
           return res.send(req.user);
        });
    } else {
    res.status(400);
    return res.send({reason: 'Trying to update a different user then your own - not allowed'});
    }

}