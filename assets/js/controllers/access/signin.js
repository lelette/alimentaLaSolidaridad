'use strict';

/****************************************************************************************
* @description :: define la interaccion necesaria para realizar el registro de usuarios *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('SigninFormController',
  ['$rootScope', '$scope', '$http', '$state', 'validarPassword', '$translate',
  function($rootScope,  $scope, $http, $state, validarPassword, $translate) {

  $scope.user = {};
  $scope.authError = null;


  /****************************************************
  * signin                                            *
  *   @descripcion :: realiza el consumo del          *
  *                   sw de inicio de session         *
  *****************************************************/
  $scope.signin = function() {
    $scope.authError = null;

    var datos = {
      login: $scope.user.login,
      password: $scope.user.password
    };

    $http.post('plataform/user/signin', datos)
    .then(function(response) {
      $state.go('app.page.index.recharge.get_contrato');
    }, function(res) {
      $scope.authError = res.data.error.msjUser;
    });
  };

}]);
