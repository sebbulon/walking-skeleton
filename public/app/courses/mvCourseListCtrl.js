/**
 * Created by sebastian.weikart on 31/03/2015.
 */

angular.module('app').controller('mvCourseListCtrl', function($scope, mvCachedCourses) {
    $scope.courses = mvCachedCourses.query();


    $scope.sortOptions = [{value: "title", text: "Sort by Title" },
        {value: "published", text: "Sort by Publish Date"}];

    $scope.sortOrder = $scope.sortOptions[0].value;

});