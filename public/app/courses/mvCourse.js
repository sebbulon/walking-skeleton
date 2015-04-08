/**
 * Created by sebastian.weikart on 31/03/2015.
 */

angular.module('app').factory('mvCourse', function($resource) {
    var CourseResource = $resource('/api/courses/:_id',  {_id: "@id"}, {
        update: {method: 'PUT', isArray: false}
    });


    return CourseResource;
});