/**
 * Created by sebastian.weikart on 27/03/2015.
 */
angular.module('app').controller('mvProfileCtrl', function($scope, mvAuth, mvIdentity, mvNotifier)
{
$scope.email = mvIdentity.currentUser.userName;
$scope.fname = mvIdentity.currentUser.firstName;
$scope.lname = mvIdentity.currentUser.lastName;


$scope.update = function() {
    var newUserData = {
        userName: $scope.email,
        firstName: $scope.fname,
        lastName: $scope.lname
    }
    if($scope.password && $scope.password.length > 0) {
        newUserData.password = $scope.password;
    };

    mvAuth.updateCurrentUser(newUserData).then(function() {
        mvNotifier.notifySuccess('Your user account has been updated');
    }, function(reason) {
        mvNotifier.notifyFail(reason);

    });
};

});