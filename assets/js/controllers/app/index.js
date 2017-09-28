'use strict';

/****************************************************************************************
* @description :: define la interaccion necesaria para realizar el registro de usuarios *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('IndexController', 
  ['$rootScope', '$scope', '$http', '$state', 'Sales', '$translate',
  function($rootScope,  $scope, $http, $state, Sales,$translate) {
    

    $scope.datos = {sales : Sales.info.resumenSales}

    Sales.refreshResumenSales(function(){
      console.log($scope.datos.sales);
    });

}]);
