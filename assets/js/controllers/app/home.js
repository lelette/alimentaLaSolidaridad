'use strict';

/****************************************************************************************
* @description :: Informacion y funciones del homepage *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('HomeController',
  ['$rootScope', '$scope', '$http', '$state', '$translate', 'User',
  function($rootScope, $scope, $http, $state, $translate, User) {
    $scope.datos= {
      tdcAfiliadas: '',
      frecuentes: '',
      recargas: 'HOLA',
    };

    $http.post('plataform/sale/getSalesAmount', {ejecutor: User.id})
    .then(function(res){
      $scope.datos.recargas = res.data.ventas;
    }, function(error){
      $scope.datos.recargas = 0;
    });

}]);
