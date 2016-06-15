'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('LoginCtrl', function ($scope,$location,authenticationService){
  	$scope.submit=function(){
  		var username=$scope.username;
  		var password=$scope.password;
  		authenticationService.login(username,password,function(resp){
        if(resp === 'success'){
            $location.path('/about');
        }
      });
  	};

    $scope.createNewAccount=function(){
          $location.path('/createNewAccount ');
    };
  });
