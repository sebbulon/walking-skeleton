/**
 * Created by sebastian.weikart on 16/03/2015.
 */
var mongoose = require('mongoose'),
    crypt = require('../common/crypto/crypto');

module.exports = function() {
    var userSchema = mongoose.Schema({
        firstName: String,
        lastName:  String,
        userName: String,
        salt: String,
        hashed_pwd:String

    });

    userSchema.methods =  {
        authenticate: function(passwordToMatch) {

            return crypto.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    }
    return userSchema;
}