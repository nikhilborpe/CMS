/**
 * Created by nborpe on 13/6/16.
 */
'use strict';

angular.module('cmsApp').service('authenticationService',['$http','$log','$location',function($http,$log,$location){

  this.login=function(username,password,cb){
      $http({
        url:'http://localhost:8080/cms/login?username='+username+'&password='+password,
        method:'GET'
      }).then(
        function(resp){
            $location.path('/about');
        },
        function(resp){
          $log.log(resp);
          cb(resp);
        }
      );
  };
}]);
