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
    $scope.cardType = ""
    $scope.checkDate = "";

    // Objeto que almacenara los datos de la tarjeta
    $scope.card = {
      name: "",
      number: "",
      cvc: "",
      exp_year: "",
      exp_month: "",
      country: "",
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
      address: ""
    };

    // Tarjeta afiliadas del usuario
    $scope.cards = [];

    // Consulta las tarjetas afiliadas del usuario
    $scope.loader='mostrar';
    $scope.cuerpo='ocultar';
    $http.get('platform/stripe/getCards')
      .then(function(response){
        $scope.loader='ocultar';
        $scope.cuerpo='mostrar';
        $scope.cards = response.data.data;
      }, function(error){
        $scope.loader='ocultar';
        $scope.cuerpo='mostrar';
      });

    /****************************************************************************************
    *    function     :: Funcion que permite afiliar la tarjeta de credito                  *
    *    @description :: Permite la afiliación de una tarjeta a un customer en Stripe       *
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
      $scope.loader='mostrar';
      $scope.cuerpo='ocultar';
      Stripe.card.createToken($scope.card,function(status, res){
        if(res.error){
          console.log("Ocurrio un error ....");
            $scope.loader='ocultar';
            $scope.cuerpo='mostrar';
        }else{
          var card_customer = {
            token: res.id,
            email: $scope.fullCard.email,
            description: $scope.fullCard.description,
          }

          $http.post('platform/stripe/affiliateCard', card_customer)
            .then(function(response){
                $scope.loader='ocultar';
                $scope.cuerpo='mostrar';
              $state.reload();
            }, function(error){
              console.log(error);
                $scope.loader='ocultar';
                $scope.cuerpo='mostrar';
            });
        }
      });
    };

    /*********************************************************************************************
    *    function     :: Funcion que permite saber que tipo de tarjeta va utilizar dinámicamente *
    *    @description :: Permite adivinar que tipo de TDC es con los primeros dígitos de la TDC  *
    *    @autor       :: Javier Stifano <jstifano@transamovil.com>                               *
    **********************************************************************************************/

    $scope.showType = function(card){

      if(!card){
        $scope.cardType = 'Not found';
        return $scope.cardType;
      }
      else if(card[0] == '4'){
        $scope.cardType = 'Visa';
        return $scope.cardType;
      }
      else if(card[0]+card[1] == '51' || card[0]+card[1] == '52' || card[0]+card[1] == '53' || card[0]+card[1] == '54' ||
      card[0]+card[1] == '55' || card[0]+card[1] == '22' || card[0]+card[1] == '23' || card[0]+card[1] == '24' || card[0]+card[1] == '25' ||
      card[0]+card[1] == '26' || card[0]+card[1] == '27'){
        $scope.cardType = 'Mastercard';
        return $scope.cardType;
      }
      /*else if(card[0]+card[1] == '34' || card[0]+card[1] == '37'){
        $scope.cardType = 'AmericanExpress';
        return $scope.cardType;
      }*/
      else{
        $scope.cardType = 'Not found';
        return $scope.cardType;
      }
    }

    /***************************************************************************************************
    *    function     :: Funcion que permite validar si la fecha de expiración es válida               *
    *    @description :: Permite adivinar si el mes ingresado es válido y si el año es mayor al actual *
    *    @autor       :: Javier Stifano <jstifano@transamovil.com>                                     *
    ****************************************************************************************************/

    $scope.verifyDate = function(date){
      var current_date = new Date();
      var current_year = current_date.getFullYear();
      var current_month = current_date.getMonth()+1;

      var month = parseInt(date.split("/")[0]);
      var year = parseInt(date.split("/")[1]);

      if(month > 12 || month <= 0){
        $scope.checkDate = false;
      }
      else if(year < current_year){
        $scope.checkDate = false;
      }
      else if(month <= current_month && year <= current_year){
        $scope.checkDate = false;
      }
      else{
        $scope.checkDate = true;
        return $scope.checkDate;
      }

    };

    /****************************************************************************************
    *    function     :: Funcion que permite desafiliar una tarjeta de crédito              *
    *    @description :: Permite desafiliar la tarjeta de crédito de un customer en Stripe  *
    *    @autor       :: Javier Stifano <jstifano@transamovil.com>                          *
    *****************************************************************************************/

    $scope.desafiliarTarjeta = function(card){

      var data = {
        token: card // Token de la tarjeta
      }
      $scope.loader='mostrar';
      $scope.cuerpo='ocultar';
      $http.post('platform/stripe/untieCard', data)
        .then(function(response){
          if(response.data.deleted){
            $scope.loader='ocultar';
            $scope.cuerpo='mostrar';
            $state.reload();
          }else {
            $scope.loader='ocultar';
            $scope.cuerpo='mostrar';
            console.log("NO SE DESAFILIO LA TARJETA");
          }
        }, function(error){
          $scope.loader='ocultar';
          $scope.cuerpo='mostrar';
          console.log(error);
        });
    };


}]);
