/**
 * Created by sebastian.weikart on 12/03/2015.
 */

var mongoose = require('mongoose'),
    crypto = require('../common/crypto/crypto')
;

module.exports = function(config) {

    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error... '));
    db.once('open', function callback() {
        console.log('walkingskeleton db opened');
    });


    var userSchema = mongoose.Schema({
        firstName: String,
        lastName:  String,
        userName: String,
        salt: String,
        hashed_pwd:String,
        roles: [String]

    });

    userSchema.methods =  {
        authenticate: function(passwordToMatch) {

            return crypto.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    }
    // TODO for now lets do it like this, but must be improved and modularised in the future.
    // TODO Database code must be separated from schema / model definition somehow
    var User = mongoose.model('User', userSchema, 'User');

    User.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            console.log('creating some test users');
            var salt, hash;
            salt = crypto.createSalt();
            hash = crypto.hashPwd(salt, 'test123')
            User.create({firstName: 'Sebastian', lastName: 'Weikart', userName : 'SebWeikart', salt:salt, hashed_pwd:hash, roles: ['admin']  });
            salt = crypto.createSalt();
            hash = crypto.hashPwd(salt, 'test123')
            User.create({firstName: 'Sebastian', lastName: 'Weikart2', userName : 'SebWeikart2', salt:salt, hashed_pwd:hash, roles: []});
            salt = crypto.createSalt();
            hash = crypto.hashPwd(salt, 'test123')
            User.create({firstName: 'Sebastian', lastName: 'Weikart3', userName : 'SebWeikart3', salt:salt, hashed_pwd:hash});
            salt = crypto.createSalt();
            hash = crypto.hashPwd(salt, 'test123')
            User.create({firstName: 'Sebastian', lastName: 'Weikart4', userName : 'SebWeikart4', salt:salt, hashed_pwd:hash, roles: ['merchandiser', 'content', 'operations']});
            salt = crypto.createSalt();
            hash = crypto.hashPwd(salt, 'test123')
            User.create({firstName: 'Sebastian', lastName: 'Weikart5', userName : 'SebWeikart5', salt:salt, hashed_pwd:hash, roles: ['customer']});


        }
    })

}