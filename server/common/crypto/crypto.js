/**
 * Created by sebastian.weikart on 16/03/2015.
 */
var crypto = require('crypto');
//TODO SW use bcrypt instead
module.exports = {

    createSalt: function () {
        return crypto.randomBytes(128).toString('base64');
    },
    hashPwd: function (salt, pwd) {
        var hmac = crypto.createHmac('sha1', salt);
        return hmac.update(pwd).digest('hex');
    }

}
