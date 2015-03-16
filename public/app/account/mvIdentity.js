/**
 * Created by sebastian.weikart on 13/03/2015.
 */

angular.module('app').factory('mvIdentity', function() {
    return {
        currentUser: undefined,
        isAuthenticated: function() {
            return !!this.currentUser;

        }

    }
})