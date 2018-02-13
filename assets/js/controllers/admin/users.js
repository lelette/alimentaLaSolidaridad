'use strict';

/****************************************************************************************
* @description :: define la interaccion necesaria para realizar el registro de usuarios *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('UsersController',
  ['$rootScope', '$scope', '$http', '$state', '$translate',
  function($rootScope,  $scope, $http, $state, $translate) {


    $scope.datos = { users : []} ;
    $scope.techo = undefined;
    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.data = [];

    $scope.consultar = function(page){
      if ( ($scope.techo && ($scope.currentPage >= $scope.techo) ) || page == 0) {
        return ;
      };
      $http.get('plataform/user/users?page='+page+'')
      .then(function(res){
        if (res.data.users.length == 0 && (page) > 1) {
          // console.log(page);
        $scope.techo = page-1;
          $scope.consultar(page-1);
        }else{
          $scope.datos.users = [];
          $scope.currentPage = page;
        res.data.users.forEach(function(user){
            // detectamos el email principal
            var emailLogin = undefined;
            user.emails.forEach(function(email){
              if (email.enableLogin) {
                emailLogin = email.email.email;
              };
            });
            user.emailLogin = emailLogin;

            // detectamos el phone principal
            var phoneLogin = undefined;
            user.phones.forEach(function(phone){
              if (phone.enableLogin) {
                phoneLogin = phone.phone.phone;
              };
            });
            user.phoneLogin = phoneLogin;

            // verificamos si el usuario esta bloqueado
            user.bloqueado = false;
            if (user.bloqueos.length > 0) user.bloqueado = true;

            user.privilegios.forEach(function(priv){
              switch (priv.privilegio.nombre) {
                case "administrador":
                  user.administrador = true;
                default:
                  user.estandar = true;
              }
            });

            $scope.datos.users.push(user);
          });
        };
      }, function(res){
        console.log(res.data);
      });
    }

    $scope.consultar(1);

    /*******************************************************************
    * asignar                                                          *
    * @descripcion :: asigna el privilegio indicado al user de entrada *
    ********************************************************************/
    $scope.asignar = function(privilegio, actual, userId){
      var datos = {
        user: userId,
        privilegio: privilegio,
        enable: actual
      };
      // console.log(datos);
      $http.post('plataform/user/privilege/enable', datos)
      .then(function(res){
        // console.log(res);
      }, function(res){
        // console.log(res.data);
      });
    }

    /*******************************************************************
    * lock_unlock                                                      *
    * @descripcion :: bloquea o desbloquea al usuario                  *
    ********************************************************************/
    $scope.lock_unlock = function(lock, userId){
      // console.log(lock,userId);
    }
}]);
