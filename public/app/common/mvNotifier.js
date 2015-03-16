/**
 * Created by sebastian.weikart on 13/03/2015.
 */


angular.module('app').value('mvToastr', toastr);


angular.module('app').factory('mvNotifier', function(mvToastr) {
    return {
        notifySuccess: function(msg) {
            mvToastr.success(msg);
            console.log(msg);
        },
        notifyFail: function(msg) {
            mvToastr.error(msg);
            console.log(msg);
        }

    }

})