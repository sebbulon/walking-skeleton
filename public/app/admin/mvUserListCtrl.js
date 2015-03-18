/**
 * Created by sebastian.weikart on 18/03/2015.
 */

angular.module('app').controller('mvUserListCtrl', function($scope, mvUser) {
    $scope.users = mvUser.query();

})