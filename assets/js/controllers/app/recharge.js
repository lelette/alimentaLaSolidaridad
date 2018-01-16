'use strict';

/****************************************************************************************
* @description :: define toda la interaccion de las vistas relacionadas al perfil       *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/
app.controller('ReloadController',
  ['$rootScope', '$scope', '$http', '$state', 'Recharge', '$translate', '$stateParams', '$uibModal',
  function($rootScope,  $scope, $http, $state, Recharge, $translate, $stateParams, $uibModal) {
    console.log('Recharge', Recharge);

  // Stripe.setPublishableKey('pk_test_hsQOE82w7dCyZeKglL5mUzV5'); // Identificacion con Stripe
  $scope.btnClassRecarga = "btn-green-off";
  $scope.btnPayment = "btn-green-off";
  $scope.btnClassPay = "btn-green-off";
  $scope.btnClassPassPay = "btn-green-off";
  $scope.btnClassModePay = "btn-off";
  $scope.disabledNumberCountry = true;
  $scope.error_msj_oferta = false;
  $scope.cart = [];
  $scope.modo = null; // Si agrego oferta o no al carrito antes de pasar a pagar
  $scope.totalCart = 0;
  $scope.datos = {
    cod: 'Pais',
    contrato: '',
    operadora: ''
  };

  $scope.typePay = "tdcnueva"; // Tipo de pago a elegir (Pago con tdc nueva o Tarjetas afiliadas)
  $scope.cardSelected = ""; // Token de la tarjeta seleccionada

  $scope.pais = {}
  $scope.loaderRecharge = 'ocultar';
  $scope.loader = 'mostrar';
  $scope.cuerpo = 'ocultar';
  $scope.cards = [];

  // Variables fijas del Header
  $rootScope.header = {};
  $rootScope.header.icono = "images/icoEnviarRecarga.png"; // Icono del Sub-Header
  $rootScope.header.namePage = "Enviar Recarga"; // Titulo del Sub-Header
  $scope.btnOfertas = true;
  $scope.showFrecuent = false;
  $scope.showOffers   = false;
  $scope.showOperator = false;
  $scope.showCountry = false;
  $scope.formTDC = false;
  $scope.card = {}
  $scope.fullCard = {}
  $scope.resumenRecarga = false;

  $http.get('platform/stripe/getCards')
  .then(function(response){
    console.log('response.data', response.data);
    if (response.data.data.length > 0) {
      $scope.typePay = "afiliadas";
      $scope.cards = response.data.data;
    }
    $scope.loader = 'ocultar';
    $scope.cuerpo = 'mostrar';
  }, function(error){
    console.log('Error >>>', error);
    $scope.loader = 'ocultar';
    $scope.cuerpo = 'mostrar';
  });

  $http.get('plataform/user/searchFrecuente')
  .then(function(response){
    $scope.frecuentes = response.data;
  }, function(error){

  });


  if (Recharge.info.pais && Recharge.info.pais.codigo && Recharge.info.pais.numero && Recharge.info.pais.url
    && Recharge.info.pais.operadora && Recharge.info.ofertas) {
     $scope.resumenRecarga = true;
     $scope.ofertas = Recharge.info.ofertas;
     $scope.pais.cod = Recharge.info.pais.codigo;
     $scope.pais.url = Recharge.info.pais.url;
     $scope.datos.contrato = Recharge.info.pais.numero
     $scope.datos.operadora = Recharge.info.pais.operadora;
     $scope.showCountry = true;
     $scope.showOffers = true;
     $scope.showOperator = true;
  }else {
    $http.get('plataform/countries').then(function(response) {
      $scope.countries = response.data.paises;
      $scope.$emit('$resetAjax');
    }, function(res) {
      $scope.$emit('$resetAjax');
      $scope.$emit('$errorAjax',res.data);
    });
  }


  setTimeout(function() {

    if (Recharge.cart.details.length != 0) {
      $scope.cart = Recharge.cart.details;
      $scope.btnClassModePay = "btn-green-on";
      $scope.totalCart = 0;
      for (let item of $scope.cart) {
        $scope.totalCart =  $scope.totalCart + (parseFloat(item.fee)+ parseFloat(item.price_unit))
      }

    }
    $scope.$apply(); //this triggers a $digest
  }, 2000);

  /*************************************************************************************************
  *    function     :: Funcion que permite añadir con cual tarjeta afiliada se va realizar el pago *
  *    @description :: Permite saber cual tarjeta afiliada fue seleccionada mediante el checkbox   *
  *    @autor       :: Javier Stifano <jstifano@transamovil.com>                                   *
  **************************************************************************************************/
  $scope.removeRecharge = function (idSale) {
    $http.post('plataform/sales/deleteShoppingCart', {id: idSale})
    .then(function(response){
      var cart = Recharge.cart.details;
      var data = response.data[0];
      cart.forEach(function (elemento, indice, array) {
        if (elemento.idSale == data.id) {
          cart.splice(indice,1);
          $scope.totalCart = parseFloat($scope.totalCart) - (parseFloat(elemento.price_unit) + parseFloat(elemento.fee));
        }
      });
      Recharge.cart.details = cart;

      //$state.reload();
    }, function(error){
      console.log('Error >>>', error);
    });

  }

  $scope.changeBtnPay = function (cambio) {
    if (cambio) {
      $scope.formTDC = cambio;
      $scope.btnClassPay = "btn-green-on";
    }else {
      $scope.formTDC = cambio;
      $scope.btnClassPay = "btn-green-off";
    }
  }

  $scope.changeNewTDC = function () {
    $scope.newTDC = false;
    $scope.btnClassPay = 'btn-green-off';
  }

  $scope.selectCardTdc = function (card) {
    $rootScope.newTDC = false;
    if (card) {
      Recharge.cart.card = card;
      $scope.formTDC = true;
      $scope.btnClassPay = "btn-green-on";
    }else {
      $scope.formTDC = false;
      $scope.btnClassPay = "btn-green-off";
    }
  }

  $scope.updateSelected = function(token){
    $scope.cardSelected = token;
  }

  $scope.procederAlPago = function (modo) {
    if (modo == 'oferta') {
      $scope.agregarAlCarrito();
      $state.go('app.page.recharge.get_token_stripe');
    }else {
      $state.go('app.page.recharge.get_token_stripe');
    }
  }

  $scope.agregarAlCarrito = function () {
    if (Recharge.info.oferta) {
      $http.post('plataform/sales/shoppingCartRegister', Recharge.info.oferta)
      .then(function (res) {
        Recharge.info.oferta.idSale = res.data.venta.id;
        Recharge.cart.details.push(Recharge.info.oferta);
        $scope.cart = Recharge.cart.details;
        $scope.btnClassModePay = "btn-green-on";
        $scope.showCountry = false;
        $scope.showOperator = false;
        $scope.showOffers = false;
        $scope.datos = {};
        Recharge.reset();
        $state.reload();
      }, function (error) {

      });
    }
  }

  $scope.selectOffer = function (producto) {
    // console.log('producto', producto);
    // console.log('ofertas', Recharge.info.ofertas);
    $scope.btnClassPassPay = "btn-green-on";
    $scope.modo = 'oferta';
    Recharge.info.oferta = producto;
    Recharge.info.oferta.localCurrency = Recharge.info.ofertas.moneda_local;
    Recharge.info.oferta.phone = Recharge.info.ofertas.telefono_destino;
    Recharge.info.oferta.operator = Recharge.info.ofertas.operadora;
    $scope.btnClassRecarga = "btn-green-on";
  }

  $scope.afiliarTarjeta = function(card_customer){
    $http.post('platform/stripe/affiliateCard', card_customer)
      .then(function(response){
        console.log('response card_customer', response);
      }, function(error){
        console.log('error card_customer', error);
      });
  };

  $scope.recharge = function (valid) {
    console.log('valid', valid);
    console.log('Recharge.cart', Recharge.cart);
    if (Recharge.cart.card) {
      Recharge.cart.token = Recharge.cart.card.id;
      Recharge.cart.customer = Recharge.cart.card.customer;
      $scope.loader = 'mostrar';
      $scope.cuerpo = 'ocultar';
      $http.post('plataform/sales/shoppingCart', Recharge.cart).then(function(response) {
        Recharge.result = response.data.recargas;
        $scope.$emit('$resetAjax');
        $scope.loader = 'ocultar';
        $scope.cuerpo = 'mostrar';
        $state.go('app.page.rechargeResult');
      });
    }else {
      if (valid) {
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
        $scope.loader = 'mostrar';
        $scope.cuerpo = 'ocultar';
        // Stripe.card.createToken($scope.card,function(status, res){
        //   if(res.error){
        //
        //       $scope.loader = 'ocultar';
        //       $scope.cuerpo = 'mostrar';
        //   }else{
        //     Recharge.cart.token = res.id;
        //
        //     if (Recharge.cart.checkAfiliacionTDC) {
        //       var card_customer = {
        //         token: res.id,
        //         email: $scope.fullCard.email,
        //         description: $scope.fullCard.description,
        //       }
        //       $scope.afiliarTarjeta(card_customer);
        //     }
        //
        //     $http.post('plataform/sales/shoppingCart', Recharge.cart).then(function(response) {
        //       Recharge.result = response.data.recargas;
        //       $scope.$emit('$resetAjax');
        //       $scope.loader = 'ocultar';
        //       $scope.cuerpo = 'mostrar';
        //       $state.go('app.page.rechargeResult');
        //     });
        //   }
        // });
      }
    }

   }

  $scope.countrySelected = function (country) {
   $scope.showCountry = true;
   $scope.disabledNumberCountry = false;
   $scope.pais = {
     url: 'images/banderas/'+country.name+'.png',
     cod: '+'+country.phone_code
   };
   $scope.datos.cod = country.phone_code;
   Recharge.info.pais.codigo = country.phone_code;
  };

  $scope.obtenerOfertas = function (telef){

   var numero = $scope.datos.contrato;
   var cod = $scope.datos.cod;
   var telefono = undefined;
   var validacionTelef = true;

   if (Recharge.info.pais && Recharge.info.pais.codigo) cod = Recharge.info.pais.codigo;
   if (!cod || cod == 'Pais'){$scope.error_msj_offer = "Introduzca el codigo de Pais";return}
   if (!numero) {$scope.error_msj_offer = "Introduzca el numero a recargar";return}

   if (cod && numero) {
     if (numero.toString().length < 5 || numero.toString().length > 12){
       $scope.error_msj_offer = "El numero debe ser mayor a cuatro (4) y menor a doce(12) digitos";
       return;
     }
     $scope.error_msj_offer = "";
     telefono = cod+numero;
   }else if (telef) {
     telefono = telef;
   }

   if (telefono) {
    if (Recharge.cart.details.length > 0) $scope.btnClassPassPay = "btn-green-on";

    $scope.showOffers = false;
    //$scope.loaderRecharge = 'mostrar';
    $scope.loader = 'mostrar';
    $scope.cuerpo = 'ocultar';
    $http.post('plataform/offers',{
          // Telefono de reales --> España "34912509849" ; Argentina "5491127184499"
          "phone":  telefono
     }).then(function(res){
       $scope.error_msj_oferta = false;
      //  $scope.loaderRecharge = 'ocultar';
       $scope.loader = 'ocultar';
       $scope.cuerpo = 'mostrar';
       var ofertas = res.data;
       var operadora = ofertas.operadora;
       console.log('ofertas', ofertas);
       Recharge.info.ofertas = ofertas;
       Recharge.info.pais = {
         codigo: cod,
         numero: numero,
         operadora: operadora
       }
      $scope.datos.operadora = operadora;
      $scope.ofertas = Recharge.info.ofertas;
      $scope.showOffers = true; $scope.showOperator = true;
    }, function(res){
      //$scope.loaderRecharge = 'ocultar';
      $scope.loader = 'ocultar';
      $scope.cuerpo = 'mostrar';
      $scope.showOffers = false;
      $scope.error_msj_oferta = true;
      /*$scope.$emit('$resetAjax');
      $scope.$emit('$errorAjax',res.data);*/
    });
    }
  }

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
   else if(card[0]+card[1] == '34' || card[0]+card[1] == '37'){
     $scope.cardType = 'AmericanExpress';
     return $scope.cardType;
   }
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


 if (($stateParams.code != '')&&($stateParams.url != '')){
    $scope.disabledNumberCountry = false;
    $scope.showCountry = true;
    $scope.pais.cod = $stateParams.code;
    $scope.datos.cod = $scope.pais.cod;
    $scope.pais.url = $stateParams.url;
    if (($stateParams.number != '')) {
      $scope.datos.contrato = $stateParams.number;
      var telefono = $scope.pais.cod+$scope.datos.contrato;
      $scope.obtenerOfertas(telefono)
    }
 }

}]);

app.controller('modalResultRecharge',[
 '$scope',
 '$state',
 '$modalInstance',
 '$uibModal',
 'dataScope',
 '$http',
 function($scope, $state, $modalInstance, $uibModal, dataScope, $http) {
   console.log('dataScope', dataScope);
   $scope.result = dataScope.result;

   $scope.confirmar = function() {
      $modalInstance.close($scope.datos.alias);
   };

   $scope.cancel = function() {
     $modalInstance.dismiss('cancel');
   };
  }
]);
