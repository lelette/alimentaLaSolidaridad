'use strict';

/****************************************************************************************
* @description :: define la interaccion necesaria para realizar el registro de usuarios *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('SignupFormController',
  ['$rootScope', '$scope', '$http', '$state', 'validarPassword', '$translate',
  function($rootScope,  $scope, $http, $state, validarPassword, $translate) {
    $rootScope.header = {}
    $rootScope.header.icono = "images/icoMiPerfil.png";
    $rootScope.header.namePage = "signup.subtitulo";
    $scope.loading = false;

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

  //************* Verifica si el correo ya fue registrado **********************//
  $scope.consultaCorreo = function() {
    if ($scope.user.email !== undefined) {
      $http.post('plataform/consultaRapida',{email: $scope.user.email.toLowerCase()})
      .then(function(res) {  // success
        if (res.data.msj === false) {
          $scope.correoval = "El correo ingresado ya está registrado";
          $scope.correoValido = true;
        }
        else {
          $scope.correoval = "";
          $scope.correoValido = false;
        };
      }, function(res) { // fail
        if (res.data.error && res.data.error.codigo == 10000) $scope.$emit('$errorAjax',res.data);
      });
    }
    else {
      $scope.correoval = "";
    }
  };

  if ($scope.user.email) $scope.consultaCorreo();
  /****************************************************
  * signup                                            *
  *   @descripcion :: realiza el consumo del          *
  *                   sw de registro de usuarios      *
  *****************************************************/
  $scope.signup = function() {
    $scope.authError = null;
    $scope.loading = true;

    var recaptcha = $scope.$getValRecaptcha();

    if (!recaptcha) {
      $scope.loading = false;
      $scope.authError = 'err.recaptcha.required';
      return false;
    };

    var datos = {
      nombres: $scope.user.nombres,
      email: $scope.user.email,
      password: $scope.user.password,
      recaptcha: recaptcha
    };

    $http.post('plataform/user/signup', datos)
    .then(function(response) {

      $http.post('plataform/validation/generate',{
        data_target: "email"
      })
      .then(function(resonse){
        $scope.loading = false;
        $state.go('access.emitValEmail');
      },function(res){
        $scope.loading = false;
        $scope.authError = res.data.error.msjUser;
      });

    }, function(res) {
      $scope.loading = false;
      $scope.authError = res.data.error.msjUser;

    });
  };


}]);



app.controller('SuccessController',
  ['$rootScope', '$scope', '$http', '$state', '$translate',
  function($rootScope,  $scope, $http, $state, $translate) {

    $rootScope.header = {}
    $rootScope.header.icono = "images/icoMiPerfil.png";
    $rootScope.header.namePage = "signup.subtitulo";

    $scope.redirect = function () {
        $state.go('access.signin');
    }

  }]);
