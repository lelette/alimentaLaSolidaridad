'use strict';

/****************************************************************************************
* @description :: Informacion y funciones del homepage *
* @autor :: Marialette Argulles marguelles@transamovil.com                                       *
*****************************************************************************************/

app.controller('HomeCtrl',
  ['$rootScope', '$scope', '$http', '$state', '$translate', 'User',
  function($rootScope, $scope, $http, $state, $translate, User) {

    $scope.datos  = {
      tdcAfiliadas: 0,
      frecuentes: 0,
      recargas: 0
    };

    $scope.showCountry = false;

    $http.get('plataform/countries').then(function(response) {
      $scope.countries = response.data.paises;
      $scope.$emit('$resetAjax');
    }, function(res) {
      $scope.$emit('$resetAjax');
      $scope.$emit('$errorAjax',res.data);
    });

    $scope.countrySelected = function (country) {
      $scope.showCountry = true;
      $scope.pais = {
        url: 'images/banderas/'+country.name+'.png',
        ext: '+'+country.phone_code
      };
    };

    $http.post('plataform/sale/getSalesAmount')
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
      $scope.datos.tdcAfiliadas = res.data.data.length;
    }, function(error){
      $scope.datos.tdcAfiliadas = 0;
    })
    //************************ FIN DE CARGA DE CONTROLADOR **************************

    //************************* FUNCIONES DEL CONTROLADOR **************************
    /** REDIRECT
    * description: funcion para redirigir al usuario al flujo de recarga
    **/
    $scope.redirect = function (){
     if (($scope.count!=0)&&($scope.count == 10)){
       var cod = " ";
       var contrato = $scope.contrato;
       $state.go('app.page.recharge', {cod: cod, contrato: contrato});
     }
   }
   //************************ FIN DE FUNCIONES DEL CONTROLADOR **************************

}]);
