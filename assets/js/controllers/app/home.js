'use strict';

/****************************************************************************************
* @description :: Informacion y funciones del homepage *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('HomeCtrl',
  ['$rootScope', '$scope', '$http', '$state', '$translate', 'User',
  function($rootScope, $scope, $http, $state, $translate, User) {

    $scope.datos  = {
      tdcAfiliadas: '',
      frecuentes: '',
      recargas: 'HOLA'
    };
    /*
    console.log('$rootScope.loader', $scope.loader);
    console.log('$rootScope.cuerpo', $scope.cuerpo);

    $http.pendingRequests.length = 0; // Reseteo las peticiones cero
    $scope.conteoDePeticiones = 0;
    $scope.loader = 'ocultar'; // Permite ocultar el loader cuando solo haya una peticion por finalizar
    $scope.cuerpo = 'mostrar';
    console.log('$rootScope.loader', $scope.loader);
    console.log('$rootScope.cuerpo', $scope.cuerpo);
    $scope.$watch("conteoDePeticiones",function(newValue,oldValue) {
      // Se manejan X peticiones en http en este controlador
      console.log('entre en el watch');
      //if ($scope.conteoDePeticiones >= 0) {
        $scope.loader = 'ocultar'; // Permite ocultar el loader cuando solo haya una peticion por finalizar
        $scope.cuerpo = 'mostrar';
      //}
    });


    /*
    $http.post('plataform/sale/getSalesAmount', {ejecutor: User.id})
    .then(function(res){
      $scope.datos.recargas = res.data.ventas;
    }, function(error){
      $scope.datos.recargas = 0;
    });
    */

}]);
