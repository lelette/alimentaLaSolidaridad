'use strict';

/****************************************************************************************
* @description :: Informacion y funciones del homepage *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('HomeController',
  ['$rootScope', '$scope', '$http', '$state', '$translate', 'User', '$timeout',
  function($rootScope, $scope, $http, $state, $translate, User, $timeout) {
    $scope.datos= {
      tdcAfiliadas: '',
      frecuentes: '',
      recargas: '',
    };
    $scope.count = 0;
    $scope.auxCount = false;
    $http.post('plataform/sale/getSalesAmount', {ejecutor: User.id})
    .then(function(res){
      $scope.datos.recargas = res.data.ventas;
    }, function(error){
      $scope.datos.recargas = 0;
    });

    $scope.redirect = function (){
     if (($scope.count!=0)&&($scope.count == 7)&&($scope.auxCount  == true)){
       var cod = " ";
       var contrato = $scope.contrato;
       $state.go('app.page.recharge', {cod: cod, contrato: contrato});
     }
   }

}]);
