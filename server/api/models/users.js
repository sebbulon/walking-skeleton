/**
 * Created by sebastian.weikart on 16/03/2015.
 */

// TODO - try to define models independent of database code
var mongoose = require('mongoose'),
    crypt = require('../../common/crypto/crypto');


var userSchema = mongoose.Schema({
    firstName: {type:String, required:'{PATH is required!'},
    lastName:  {type:String, required:'{PATH is required!'},
    userName: {
        type: String,
        unique: 'Username already exists',
        required:'{PATH is required!',
        trim: true
    },
    salt: {type:String, required:'{PATH is required!'},
    hashed_pwd:{type:String, required:'{PATH is required!'},
    roles: [String]

});

userSchema.methods =  {
    authenticate: function(passwordToMatch) {

        return crypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role) {
        return this.roles.indexOf(role) > -1;
    }
}
// TODO for now lets do it like this, but must be improved and modularised in the future.
// TODO Database code should  be separated from schema / model definition somehow
var User = mongoose.model('User', userSchema, 'User');

function createDefaultUsers() {
    User.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            console.log('creating some test users');
            var salt, hash;
            salt = crypt.createSalt();
            hash = crypt.hashPwd(salt, 'test123')
            User.create({
                firstName: 'Super',
                lastName: 'Admin',
                userName: 'sebastian.weikart@gmail.com',
                salt: salt,
                hashed_pwd: hash,
                roles: ['admin']
            });



        }
    });
};
exports.createDefaultUsers = createDefaultUsers;
