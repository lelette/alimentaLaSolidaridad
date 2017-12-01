'use strict';

/****************************************************************************************
* @description :: Informacion y funciones del homepage *
* @autor :: Marialette Argulles marguelles@transamovil.com                                       *
*****************************************************************************************/

app.controller('rechargeResultCtrl',
  ['$rootScope', '$scope', '$http', '$state', 'Recharge', '$translate', 'User',
  function($rootScope, $scope, $http, $state, Recharge, $translate, User) {
    console.log('Recharge.result', Recharge.result);
    $scope.result = Recharge.result;
    $scope.datos  = {
      tdcAfiliadas: 0,
      frecuentes: 0,
      recargas: 0
    };
    $scope.pais = {}
    $scope.disabledNumberCountry = true;
    $scope.showCountry = false;


}]);
