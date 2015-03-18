/**
 * Created by sebastian.weikart on 13/03/2015.
 */
angular.module('app').service('mvAuth', function($http, mvIdentity, $q, mvUser) {
    return {
        createUser: function(newUserData) {
            var newUser = new mvUser(newUserData);
            var dfd = $q.defer();

            newUser.$save().then(function() {
                mvIdentity.currentUser = newUser;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },
        authenticateUser: function(username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function(response){
                if(response.data.success) {
                    var user = new mvUser();
                    angular.extend(user, response.data.user);
                    mvIdentity.currentUser = user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }

            });
            return dfd.promise;
        },
        logoutUser: function() {
            var dfd = $q.defer();
            $http.post('/logout', {logout:true}).then(function() {
                mvIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },

        authorizeCurrentUserForRoute: function(role) {
            if(mvIdentity.isAuthorized('admin')) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    }

})