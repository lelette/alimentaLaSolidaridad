'use strict';

/****************************************************************************************
* @description :: define la interaccion necesaria para realizar el registro de usuarios *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('ForgotpwdController',
  ['$rootScope', '$scope', '$http', '$state', '$translate',
  function($rootScope,  $scope, $http, $state, $translate) {

  $scope.authError = undefined;
  $scope.user = {};
  /****************************************************
  * signup                                            *
  *   @descripcion :: realiza el consumo del          *
  *                   sw de registro de usuarios      *
  *****************************************************/
  $scope.forgotpwd = function() {
    $scope.authError = null;


    var recaptcha = $scope.$getValRecaptcha();

    if (!recaptcha) {
      $scope.authError = 'err.recaptcha.required';
      return false;
    };

    var datos = {
      email: $scope.user.email,
      recaptcha: recaptcha
    };

    $http.post('plataform/forgotpwd/generate', datos)
    .then(function(response) {
        $state.go('access.successforgotpwd');
    }, function(res) {

      $scope.authError = res.data.error.msjUser;

    });
  };

}]);

app.controller('applyFPController',
  ['$rootScope', '$scope', '$http', '$state', '$translate', '$location', 'validarPassword',
  function($rootScope,  $scope, $http, $state, $translate, $location, validarPassword) {

/*****************************************************
  * Validaciond e password dinamica                    *
  *****************************************************/
  // Contenido y Titulo del Popover
  $scope.popoverContrasena = {
    contenido: '',
    titulo: 'signup.popover.password.titulo'
  }

  // Reiniciar los datos del popover
  $scope.validaciones = validarPassword.inicializarData();

  // Criterios para la Contraseña
  $scope.validaciones = validarPassword.criterios;

  // Inicializo el los criterios de la Contraseña
  validarPassword.imprimirContenidoPopover($scope.validaciones, function(contenido){
    $scope.popoverContrasena.contenido = contenido;
  });

  // internacionalizacion
  $rootScope.$on('$translateChangeSuccess', function(){
    validarPassword.imprimirContenidoPopover($scope.validaciones, function(contenido){
      $scope.popoverContrasena.contenido = contenido;
    });
  });

  /*****************************************************
  * testPassword                                       *
  *   @descripcion :: verifica si la contraseña es     *
  *                   valida y actualiza el popover de *
  *                   apoyo.                           *
  ******************************************************/
  $scope.testPassword = function(){
    var resultVal = $scope.$errorValidarPassword;

    // actualizamos el popover de valides de password
    $scope.validaciones.forEach(function(validacion, index){
      if (resultVal[validacion.key]) {
        $scope.validaciones[index].valor = "ok";
        $scope.validaciones[index].color = "text-success";
      }else{
        $scope.validaciones[index].valor = "remove";
        $scope.validaciones[index].color = "text-danger";
      };
    });

    validarPassword.imprimirContenidoPopover($scope.validaciones, function(contenido){
      $scope.popoverContrasena.contenido = contenido;
    });
  };

  /****************************************************
  * Fin de Validaciond e password dinamica            *
  *****************************************************/


  $scope.user = {};
  $scope.authError = null;

   /****************************************************
  * isEquals                                          *
  *   @descripcion :: verifica si dos string son      *
  *                   iguales                         *
  *****************************************************/
  $scope.isEquals = function(val1 , val2){
    return val1 == val2;
  };

  /****************************************************
  * signup                                            *
  *   @descripcion :: realiza el consumo del          *
  *                   sw de registro de usuarios      *
  *****************************************************/
  $scope.forgotpwd = function() {
    $scope.authError = null;

    var datos = {};

    if($location.search().rel)
      datos.rel = $location.search().rel;
    else {
      $scope.authError = 'forgotpwd.err';
      return false;
    }

    if($location.search().data)
      datos.data = $location.search().data;
    else {
      $scope.authError = 'forgotpwd.err';
      return false;
    }

    if($location.search().code)
      datos.code = $location.search().code;
    else {
      $scope.authError = 'forgotpwd.err';
      return false;
    }

    var datosE = {
      password: $scope.user.password,
      rel: datos.rel,
      data: 'emailrel',
      codigo: datos.code
    };

    $http.post('plataform/forgotpwd/apply', datosE)
    .then(function(response) {
        $state.go('access.successappplyfp');
    }, function(res) {

      $scope.authError = res.data.error.msjUser;

    });
  };

}]);
