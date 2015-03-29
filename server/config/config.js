/**
 * Created by sebastian.weikart on 12/03/2015.
 */
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
module.exports =  {
    development: {
        db: 'mongodb://localhost/walkingskeleton',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        db: 'mongodb://sebastian.weikart:test123@ds039291.mongolab.com:39291/suchcommercetest',
        rootPath: rootPath,
        port: process.env.PORT || 80
    },
    test: {
        db: 'mongodb://sebastian.weikart:test123@ds039291.mongolab.com:39291/test',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }

}