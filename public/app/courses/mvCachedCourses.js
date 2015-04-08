/**
 * Created by sebastian.weikart on 08/04/2015.
 */
angular.module('app').factory('mvCachedCourses', function(mvCourse) {
    var courseList;



    return {
        query: function() {
            if(!courseList) {
                courseList = mvCourse.query();
            }
            return courseList;
        }

    };
});