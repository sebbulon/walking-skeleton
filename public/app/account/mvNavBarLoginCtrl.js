/**
 * Created by sebastian.weikart on 12/03/2015.
 */
angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http, mvIdentity, mvNotifier, mvAuth) {
    $scope.identity=mvIdentity;
    $scope.signin=function(username, password) {
        mvAuth.authenticateUser(username, password).then(function(success) {
            if(success) {
                mvNotifier.notifySuccess('You have successfully signed in!');
            } else {
                mvNotifier.notifyFail('Username / Password combination is incorrect!');
            }

        });
    }
});