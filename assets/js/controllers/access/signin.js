'use strict';

/****************************************************************************************
* @description :: define la interaccion necesaria para realizar el registro de usuarios *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('SigninFormController',
  ['$rootScope', '$scope', '$http', '$state',
  function($rootScope, $scope, $http, $state) {

  $rootScope.header = {}
  $rootScope.header.icono = "images/icoMiPerfil.png";
  $rootScope.header.namePage = "signin.subtitulo";
  $scope.fbLogin = '';
  $scope.user = {};
  $scope.authError = null;
  $scope.loading = false;


  /****************************************************
  * signin                                            *
  *   @descripcion :: realiza el consumo del          *
  *                   sw de inicio de session         *
  *****************************************************/
  $scope.signin = function() {
    $scope.authError = null;
    $state.go('app.page.adminficha');

  };

}]);
