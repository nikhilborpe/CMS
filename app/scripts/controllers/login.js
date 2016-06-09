'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('LoginCtrl', function ($scope,$location){
  	$scope.submit=function(){
  		var username=$scope.username;
  		var password=$scope.password;
  		if(username == 'admin' && password=='admin'){
  			$location.path('/about');
  		}

  	};

  });
