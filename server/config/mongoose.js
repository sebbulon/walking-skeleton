/**
 * Created by sebastian.weikart on 12/03/2015.
 */

var mongoose = require('mongoose'),
    userModel = require('../api/models/users'),
    courseModel = require('../api/models/Courses')
;

module.exports = function(config) {

    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error... '));
    db.once('open', function callback() {
        console.log('walkingskeleton db opened');
    });

    userModel.createDefaultUsers();
    courseModel.createDefaultCourses();
}