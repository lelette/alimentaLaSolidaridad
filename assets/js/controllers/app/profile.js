'use strict';

/****************************************************************************************
* @description :: define toda la interaccion de las vistas relacionadas al perfil       *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('BasicController', 
  ['$rootScope', '$scope', '$http', '$state', 'User', '$translate',
  function($rootScope,  $scope, $http, $state, User, $translate) {

    $scope.user = {};

    $scope.sexos = [
      'F',
      'M'
    ];

    // refrescamos la data que tenemos del user
    User.refresh(function(err){
      if (err) {
        console.log(err);
      }else{
        $scope.user = {
          nombres : User.info.nombres,
          apellidos : User.info.apellidos,
          sexo: User.info.sexo,
          fecha_nacimiento: new Date(User.info.fecha_nacimiento)
        };
      }
    });

    /****************************************************
    * update                                            *
    *   @descripcion :: actualiza los datos del usuario *
    *****************************************************/
    $scope.update = function(){
      User.update($scope.user, function(err){
        if (err) {
          console.log(err);
        };
      });
    }

}]);

app.controller('SecurityController', 
  ['$rootScope', '$scope', '$http', '$state', 'User', 'validarPassword', '$translate',
  function($rootScope,  $scope, $http, $state, User, validarPassword, $translate) {

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
    * isEquals                                          *
    *   @descripcion :: verifica si dos string son      *
    *                   iguales                         *
    *****************************************************/
    $scope.isEquals = function(val1 , val2){
      return val1 == val2;
    };

    /****************************************************
    * Fin de Validaciond e password dinamica            *
    *****************************************************/

    $scope.user = {};

    /****************************************************
    * update                                            *
    *   @descripcion :: actualiza los datos del usuario *
    *****************************************************/
    $scope.changePwd = function(){
      User.changePwd($scope.user, function(err){
        if (err) {
          console.log(err);
        };
      });
    }

}]);


app.controller('ContactController', 
  ['$rootScope', '$scope', '$http', '$state', 'User', '$translate',
  function($rootScope,  $scope, $http, $state, User, $translate) {

    $scope.user = {
      emails : []
    };

    $scope.pagina = 1;

    // refrescamos la data que tenemos del user
    User.refresh(function(err){
      if (err) {
        console.log(err);
      }else{
        var emails = [];

        User.info.emails.forEach(function(email){
          emails.push(email);
        });

        $scope.user.emails = emails;
        console.log($scope.user.emails);
      }
    });

    $scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.data = [];

    $scope.numberOfPages=function(){
        return Math.ceil($scope.user.emails.length/$scope.pageSize);                
    }
  
}]);


app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});


app.controller('AddEmailController', 
  ['$rootScope', '$scope', '$http', '$state', 'User', '$translate',
  function($rootScope,  $scope, $http, $state, User, $translate) {

    $scope.user = {};

    $scope.add = function(){
      User.addEmail($scope.user, function(err, result){
        if (err) {
          console.log(err);
        }else{

          if ($scope.user.validate) {
            User.validateEmail({rel: result.rel}, function(err){
              if (err) {
                console.log(err);
              }else{
                $state.go('app.page.profile.contacto');
              };
            });
          }else{
            $state.go('app.page.profile.contacto');
          };
        };
      });
    };
}]);