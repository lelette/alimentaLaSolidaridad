'use strict';

/****************************************************************************************
* @description :: Informacion y funciones del homepage *
* @autor :: Marialette Argulles marguelles@transamovil.com                                       *
*****************************************************************************************/

app.controller('HomeCtrl',
  ['$rootScope', '$scope', '$http', '$state', '$translate', 'User',
  function($rootScope, $scope, $http, $state, $translate, User) {

    $scope.datos  = {
      tdcAfiliadas: '',
      frecuentes: '',
      recargas: '0'
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
*/


    $http.post('plataform/sale/getSalesAmount', {ejecutor: User.id})
    .then(function(res){
      $scope.datos.recargas = res.data.ventas;
    }, function(error){
      $scope.datos.recargas = 0;
    });


    //Consultando cantidad de frecuentes del usuario
    $http.get('plataform/user/searchFrecuente')
    .then(function(res){
      $scope.datos.frecuentes = res.data.length;
    } , function(error){
      $scope.datos.frecuentes = 0;
    });

    //Consultando cantidad de TDC afiliadas del usuario en Stripe
    $http.get('platform/stripe/getCards')
    .then(function(res){
      $scope.datos.tdcAfiliadas = res.data.length;
    }, function(error){
      $scope.datos.tdcAfiliadas = 0;
    })
    //************************ FIN DE CARGA DE CONTROLADOR **************************







    //************************* FUNCIONES DEL CONTROLADOR **************************
    /** REDIRECT
    * description: funcion para redirigir al usuario al flujo de recarga
    **/
    $scope.redirect = function (){
     if (($scope.count!=0)&&($scope.count == 10)&&($scope.auxCount  == true)){
       var cod = " ";
       var contrato = $scope.contrato;
       $state.go('app.page.recharge', {cod: cod, contrato: contrato});
     }
   }
   //************************ FIN DE FUNCIONES DEL CONTROLADOR **************************

}]);
