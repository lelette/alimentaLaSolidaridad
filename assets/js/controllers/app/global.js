'use strict';

app.controller('ErrorCtrl', [
  '$scope',
  '$http',
  '$state',
  '$rootScope',
  '$uibModal',
  '$window',
  //'Usuario',
  'toaster',
  function($scope, $http, $state, $rootScope, $uibModal, $window, /*Usuario,*/ toaster) {

  /*
    // Funcion para obtener/resetear el header csrf
    function getCSRF() {
      $http.get('csrfToken').success(function(data) {
        $http.defaults.headers.common['x-csrf-token'] = data._csrf;
      });
    };
  */


  /*
  *   listenerEvent :: resetAjax
  *   descripción :: atiende de forma centralizada el evento 'resetAjax' reiniciando
  *                  el contador de tiempo de sesión.
  */

  $scope.$on('$resetAjax', function(event) {
    event.stopPropagation();
  });

  /*
  *   listenerEvent :: clearAjax
  *   descripción :: atiende de forma centralizada el evento 'clearAjax' limpiando
  *                  el contador de tiempo de sesión.
  */

  $scope.$on('$clearAjax', function(event) {
    event.stopPropagation();
  });


  var cleanUp = function() {
    // limpiamos los eventos globales creados
    window.angular.element($window).off('$errorAjax');
    window.angular.element($window).off('$resetAjax');
    window.angular.element($window).off('$clearAjax');

    // limpiamos los datos de usuario
    //Usuario.resetearDatos();
  };

  $scope.$on('$destroy',cleanUp);

  /*
  *   listenerEvent :: errorAjax
  *   descripción :: atiende de forma centralizada el evento 'errorAjax' dandole
  *                  la interaccion deseada en cada caso.
  */

  $scope.$on('$errorAjax', function(event, error, options) {
    event.stopPropagation();
    var error = error.error;

    var opciones = options || {
      redirect : false,
      toaster : true
    };

		// deberiamos chequear la estructura del error, para evitar errores
    // comportamientos genericos ante errores.
    switch (error.codigo) {
      case 10002 :
        //getCSRF();
        $state.go('access.signin');
        break;
      case 10104 : // error de usuario no autenticado. redirigimos al signin
        //getCSRF();
        $state.go('access.signin');
        break;
        /*
      case 10602 : // error de validacion de email
        var userData = Usuario.usuario;
        var contexto = {
          titulo: 'Validar Correo',
          descripcion: 'Debe validar su correo electrónico para poder realizar la siguiente transacción.'
        }

        var ventana = $uibModal.open({
            templateUrl: 'tpl/modalValidacionCorreo.html',
            controller: 'modalValidacionCtrl',
            backdrop: 'static',
            resolve: {
              dataScope:function() {
                return {
                  usuario: {
                    correo: userData.email_principal,
                    contexto : contexto
                  }
                }
              }
            }
          });
        break;
      case 10603 : // error debe introducir su pin de seguridad para acceder
        var userData = Usuario.usuario;
        var contexto = {
          titulo: 'Introduce Pin de Seguridad',
          descripcion: 'Debe validar su pin de seguridad para poder realizar la siguiente transacción.'
        }

        $http.get('seguridad/consultarPin')
          .then(function(res){
            var estatus = res.data; // Si tiene pin (true) de lo contrario (false)
            var ventana = $uibModal.open({
                templateUrl: 'tpl/modalPinCorto.html',
                controller: 'modalValidacionCtrl',
                backdrop: 'static',
                resolve: {
                  dataScope:function() {

                    return {
                      usuario: {
                        status: estatus,
                        contexto : contexto
                      }
                    }
                  }
                }
              });

          }, function(err){
            $scope.$emit('$errorAjax', err.data);
          });
          */
      break
    default :
    	toaster.pop('error','Error',error.msjUsuario);
    }
  });

  // ****************************************************************************

}]);


/****************************************************************************************
* @description :: define la interaccion necesaria para realizar el registro de usuarios *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('GlobalCtrl',
  ['$rootScope', '$scope', '$http', '$state', 'User', 'Recharge', '$translate',
  function($rootScope,  $scope, $http, $state, User, Recharge, $translate) {
    console.log('Recharge GlobalCtrl', Recharge);
    $scope.loader = 'ocultar';
    $scope.cuerpo = 'mostrar';
    $scope.cart = [];
    var element = angular.element('.main-content');
    var name = element.attr('ui-view'); // 'content-one'
    //$rootScope.header = {}
    //   $rootScope.header.icono = "";
    //   $rootScope.header.home = true;
    //   $rootScope.header.namePage = '';
    User.refresh(function(err){
      if (err) {
        return $state.go('access.signin');
      }
      $scope.user = User.info;
      $scope.user.imagen_perfil = User.info.imagen_perfil;
      $scope.user.pin = User.info.pin;
      if (User.info.imagen_perfil.match('http')) $scope.user.imagen_perfil = User.info.imagen_perfil;
      else $scope.user.imagen_perfil = $rootScope.apiUrl+'/'+User.info.imagen_perfil;
      $rootScope.usernombre = $scope.user.nombres;
      // console.log($rootScope.usernombre);
      // Variables fijas del SUBHeader
      // if ($state.current.name=='app.page.home')
      // { $rootScope.header = {}
      //   $rootScope.header.icono = "images/icoInicio.png";
      //   $rootScope.header.home = true;
      //   $rootScope.header.namePage = $scope.user.nombres;
      //   console.log($state.current.name);
      // }else {
      //   if($state.current.name=='app.page.transactions'){
      //     $rootScope.header = {}
      //     $rootScope.header.icono = "images/icoMovimientos.png";
      //     $rootScope.header.namePage = "Movimientos";
      //   }
      //   console.log($state.current.name);
      // }

      $scope.loader = 'ocultar';
      $scope.cuerpo = 'mostrar';

    });


    $scope.logout = function(){
      $http.post('plataform/user/logout').then(function (res){
        Recharge.reset();
        Recharge.cart = {
          token: null,
          details: []
        };
        // console.log("logout");
        $state.go('access.signin');
      });
    }

    if (Recharge.cart && Recharge.cart.details.length != 0){
      $scope.cart = Recharge.cart.details;
    }else {
      $http.get('plataform/sales/getshoppingCart')
      .then(function(response){
          var res = response.data;
          if (res.carrito.length == 0) {
            Recharge.cart.details = [];
            Recharge.cart.token = null;
          }else {
            var cart = [];
            for (let value of res.carrito) {

              cart.push({
                idSale: value.id,
                id: value.idProduct,
                fee: value.serviceFee,
                operator: value.operator,
                phone: value.phone,
                price_local_unit: value.expectedAmount,
                price_unit: value.realAmount
              });
            }
            Recharge.cart.details = cart;
            $scope.cart = cart;

          }

          $scope.loader = 'ocultar'; $scope.cuerpo = 'mostrar';

      }, function(error){
        $scope.loader='ocultar';$scope.cuerpo='mostrar';
      });
    }

}]);
