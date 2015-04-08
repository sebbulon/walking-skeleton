/**
 * Created by sebastian.weikart on 31/03/2015.
 */
var Course = require('mongoose').model('Course');


exports.getCourses = function(req, res) {
    Course.find({}).exec(function(err, collection) {
       res.send(collection);

    });

}