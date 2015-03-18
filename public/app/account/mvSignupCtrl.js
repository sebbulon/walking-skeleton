/**
 * Created by sebastian.weikart on 18/03/2015.
 */

angular.module('app').controller('mvSignupCtrl', function($scope, mvUser, mvAuth, mvNotifier, $location) {
    $scope.signup = function() {
        var newUserData = {
            userName: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname
        }
        mvAuth.createUser(newUserData).then(function() {
            mvNotifier.notifySuccess('User account created!');
            $location.path('/');
        }, function(reason) {
                mvNotifier.notifyFail(reason);
            }

        )
    }

})