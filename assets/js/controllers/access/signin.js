'use strict';

/****************************************************************************************
* @description :: define la interaccion necesaria para realizar el registro de usuarios *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('SigninFormController',
  ['$rootScope', '$scope', '$http', '$state', 'validarPassword', '$translate',
  function($rootScope, $scope, $http, $state, validarPassword, $translate) {

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

  $scope.FBLogin = function (fb) {
    // console.log('INICIO CON FACEBOOK', fb);
    $http.get('plataform/user/signinFacebook')
    .then(function (response) {
      console.log(response.data);
    },function (x) {
      console.log(x.data);
    })
  };

}]);
