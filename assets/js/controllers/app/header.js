'use strict';

/****************************************************************************************
* @description :: define la interaccion necesaria para realizar el registro de usuarios *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('HeaderController',
  ['$rootScope', '$scope', '$http', '$state', '$translate',
  function($rootScope,  $scope, $http, $state, $translate) {

    $scope.logout = function(){
      $http.post('api/user/logout')
      .then(function (res) {
        console.log(res.data, "OKIIIIIII");
        $state.go('access.signin');
      }, function (res) {
        console.log("OKIIIIIII");
        alert(res.data.error);
      });
    };
  }

]);
