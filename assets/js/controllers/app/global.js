'use strict';

/****************************************************************************************
* @description :: define la interaccion necesaria para realizar el registro de usuarios *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('GlobalController',
  ['$rootScope', '$scope', '$http', '$state', 'User', '$translate',
  function($rootScope,  $scope, $http, $state, User, $translate) {
    console.log("hola");
    $scope.user = User.info;
    User.refresh(function(err){
      if (err) {
        console.log(err);
      }
    });

}]);
