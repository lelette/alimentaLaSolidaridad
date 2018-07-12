'use strict';

/****************************************************************************************
* @description :: define la interaccion necesaria para realizar el registro de usuarios *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('FichaCtrl',
  ['$rootScope', '$scope', '$http', '$state',
  function($rootScope, $scope, $http, $state) {
  $scope.representante = true;
  $scope.nino = false;
  $scope.enfermo = false;
  $scope.fichas = [{
      nombres: 'Marialette Nicole',
      apellidos: 'Arguelles Diaz',
      edad: '22',
      cedula: '25786243',
      fecha_ingreso: '02/02/2017',
      tipo: 'Representante'
  }];

  $scope.tipos = [{
    value: 'representante',
    label: 'Representante'
  }, {
    value: 'nino',
    label: 'Niño'
  }];  
  
  $scope.sexos = [{
    value: 'm',
    label: 'Masculino'
  }, {
    value: 'f',
    label: 'Femenino'
  }]; 
  $scope.estadosciviles = [{
    value: 'soltero/a',
    label: 'Soltero/a'
  }, {
    value: 'divorciado/a',
    label: 'Divorciado/a'
  },
  {
    value: 'viudo/a',
    label: 'Viduo/a'
  },{
    value: 'casado/a',
    label: 'Casado/a'
  },];  

  $scope.signin = function() {
    $scope.authError = null;
    $state.go('app.page.adminficha');

  };

}]);
