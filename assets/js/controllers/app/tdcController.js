'use strict';

/****************************************************************************************
* @description :: Define todas las funciones que manejan las tarjetas de credito        *
* @autor       :: Javier Stifano <jstifano@transamovil.com>                             *
*****************************************************************************************/

app.controller('tdcCtrl',
  ['$rootScope', '$scope', '$http', '$state','$translate',
  function($rootScope, $scope, $http, $state,$translate) {

    Stripe.setPublishableKey('pk_test_hsQOE82w7dCyZeKglL5mUzV5'); // Identificacion con Stripe

    // Variables fijas del Header
    $rootScope.header = {};
    $rootScope.header.icono = "images/icoTDCAfiliada.png"; // Icono del Sub-Header
    $rootScope.header.namePage = "TDC Afiliadas"; // Titulo del Sub-Header

    // Objeto que almacenara los datos de la tarjeta
    $scope.card = {
      name: "",
      number: "",
      cvc: "",
      exp_year: "",
      exp_month: "",
      address_zip: "",
    };

    // Entradas de HTML a transformar
    $scope.fullCard = {
      firstEntry: "",
      secondEntry: "",
      thirdEntry: "",
      fourthEntry:"",
      cardExpiry: "",
      email: "",
      description: "",
    };

    // Tarjeta afiliadas del usuario
    $scope.cards = [];

    // Consulta las tarjetas afiliadas del usuario
    $http.get('platform/stripe/getCards')
      .then(function(response){
        console.log("RESPUESTA DE TARJETA >>>>", response);
      }, function(error){

      });

    /****************************************************************************************
    *    function     :: Funcion que permite afiliar la tarjeta de credito                  *
    *    @description :: Define todas las funciones que manejan las tarjetas de credito     *
    *    @autor       :: Javier Stifano <jstifano@transamovil.com>                          *
    *****************************************************************************************/

    $scope.afiliarTarjeta = function(){
      $scope.card.number = $scope.fullCard.firstEntry+$scope.fullCard.secondEntry+$scope.fullCard.thirdEntry+$scope.fullCard.fourthEntry;

      // Validacion para cuando el mes tiene 1 solo numero como "1" o dos numeros como "24"
      if($scope.fullCard.cardExpiry.substr(0,1) >= 1 && $scope.fullCard.cardExpiry.substr(0,1) <=9){
        $scope.card.exp_month = '0'+$scope.fullCard.cardExpiry.substr(0,1);
      }
      else{
        $scope.card.exp_month = $scope.fullCard.cardExpiry.substr(0,1);
      }

      $scope.card.exp_year = $scope.fullCard.cardExpiry.substr(3,7);

      // Creo el token de seguridad de la tarjeta
      Stripe.card.createToken($scope.card,function(status, res){
        if(res.error){
          // Mientras acordamos como hacer el $errorAjax
          console.log("Ocurrio un error ...", res.error);
        }else{
          var card_customer = {
            token: res.id,
            email: $scope.fullCard.email,
            description: $scope.fullCard.description,
          }

          console.log("AFFILIATE >>>>", card_customer);
          $http.post('platform/stripe/affiliateCard', card_customer)
            .then(function(response){
              console.log("response >>>", response);
            }, function(error){
              console.log(error);
            });
        }
      });
    };

    // Queda por probar ya que no existe una sesion persistente.

    $scope.desafiliarTarjeta = function(){

    };


}]);
