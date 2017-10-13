'use strict';

/****************************************************************************************
* @description :: Informacion y funciones del homepage *
* @autor :: Marialette Argulles marguelles@transamovil.com                                       *
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

    //*********************** CARGANDO EL CONTROLADOR ******************************
    //Consultando cantidad de recargas exitosas del usuario
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
