'use strict';

/****************************************************************************************
* @description :: define toda la interaccion de las vistas relacionadas al perfil       *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('LandingHomeCtrl',
  ['$rootScope', '$scope', '$http', '$state', '$translate', '$uibModal',
  function($rootScope,  $scope, $http, $state, $translate, $uibModal) {

    $scope.consulta = {}

    // Mensajes de error
    $scope.msjErrors = {
     required: 'El campo es obligatorio',
     numero: 'Sólo números',
     email: 'Correo no válido',
     stringExt: 'Caracteres no válidos',
     fechaNac: 'Fecha no válida',
     minlength: 'Faltan números',
     maxlength: 'Excede el máximo de caracteres',
     stringStd: 'Acepta solo letras'
    };

    $scope.signin = function() {
      $scope.authError = null;
      $scope.loading = true;
      var datos = {
        login: $scope.user.login,
        password: $scope.user.password
      };

      if (!$scope.user.login) {
          $scope.authError = "Introduzca un correo";
          return
      }

      if (!$scope.user.password) {
          $scope.authError = "Introduzca la contraseña";
          return
      }

      $http.post('plataform/user/signin', datos)
      .then(function(response) {
        $scope.loading = false;
        $state.go('app.page.recharge');
      }, function(res) {
        $scope.loading = false;
        $scope.authError = res.data.error.msjUser;
      });
    };


}]);
