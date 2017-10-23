'use strict';

/****************************************************************************************
* @description :: define toda la interaccion de las vistas relacionadas al perfil       *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('GetContratoController',
  ['$rootScope', '$scope', '$http', '$state', 'Recharge','$translate', '$stateParams',
  function($rootScope,  $scope, $http, $state, Recharge, $translate, $stateParams) {
    //recibir parametros de homepage

    $scope.detailRecharge = function () {
      // Consulta el detalle de una recarga
        $http.get('/plataform/sale/getTransactions?id='+$scope.idTransaction)
        .then(function(res){
          //$scope.tr = res.data;
          console.log('transaccion', res.data);
          //orgOfertas($scope.ofertas);
        }, function(res){
          console.log(res);
        });
      ////////////////////////////////
    }


    $scope.ofertas = [];
    $scope.recharge = {};

    $scope.porPais = {};

    function orgOfertas(ofertas){
      ofertas.forEach(function(oferta){
        if (!$scope.porPais[oferta.pais.phone_code] )
          $scope.porPais[oferta.pais.phone_code] = [];
        oferta.pais.urlimg = '/images/banderas-flat/Flags_PNG/'+oferta.pais.name.replace(/[\s]+/g,'-')+'.png';
        $scope.porPais[oferta.pais.phone_code].push(oferta);
      });
    };

    $scope.currentPhoneCode = '---';

    $scope.updatePC = function(code){
      $scope.currentPhoneCode = '+' + code;
      $scope.proveedores = [];
      $scope.porPais[code].forEach(function(oferta){
        $scope.proveedores.push(oferta);
      });
    }

    /****************************************************
    * continuar                                         *
    *   @descripcion :: agrega el contrato a la recarga *
    *                   en curso y asa al siguiente     *
    *                   formulario                      *
    *****************************************************/
    $scope.continuar = function(){
      Recharge.info.contrato = $scope.currentPhoneCode.replace(/[ \+]/g,'') + $scope.recharge.contrato;
      Recharge.info.oferta = $scope.recharge.proveedor;
      $state.go('app.page.recharge.cal_amount');
    }

}]);

app.controller('CalAmountController',
  ['$rootScope', '$scope', '$http', '$state' , 'Recharge', '$translate',
  function($rootScope,  $scope, $http, $state, Recharge, $translate) {

    if (!Recharge.info.contrato || !Recharge.info.oferta) {
      Recharge.reset();
      $state.go('app.page.recharge.get_contrato');
    };

    $scope.medios = [];

    if (Recharge.info.oferta.medios.length > 1) {
      Recharge.info.oferta.medios.forEach(function(medio){

        var restricciones = JSON.parse(medio.restricciones);
        var medio = {
          medio: medio
        };

        if (restricciones.uniqueAmountExpected) {
          medio.amountExpected = restricciones.uniqueAmountExpected;
        };

        $scope.medios.push(medio);
      });
    }else{
      $scope.restricciones = JSON.parse(Recharge.info.oferta.medios[0].restricciones);
      $scope.medios = Recharge.info.oferta.medios;
    };

    $scope.currencyExpected = Recharge.info.oferta.pais.iso_currency;
    $scope.recharge = {
      amountExpected : 0,
      amountCharge: 0
    }

    /****************************************************
    * update                                            *
    *   @descripcion :: actualiza los datos del usuario *
    *****************************************************/
    $scope.getTasa = function(){

      Recharge.getTasa($scope.recharge.amountExpected, function(err, amountCharge){
        if (err) {
          console.log(err)
        }else{
          console.log(amountCharge);
          $scope.recharge.amountCharge = amountCharge;
        };
      });


    };

    /****************************************************
    * update                                            *
    *   @descripcion :: actualiza los datos del usuario *
    *****************************************************/
    $scope.continuar = function(){
      Recharge.info.amountCharge = $scope.recharge.amountCharge;
      $scope.medios.length >1 ? Recharge.info.amountExpected =  $scope.recharge.amountExpected.monto
        : Recharge.info.amountExpected = $scope.recharge.amountExpected;
      $scope.medios.length > 1 ? Recharge.info.medio =  $scope.recharge.amountExpected.medio.id
        : Recharge.info.medio = $scope.medios[0].id;
        console.log(Recharge.info);
      $state.go('app.page.recharge.get_token_stripe');
    }

}]);

app.controller('GetTokenStripeController',
  ['$rootScope', '$scope', '$http', '$state' , 'Recharge', '$translate',
  function($rootScope,  $scope, $http, $state, Recharge, $translate) {

    if (!Recharge.info.contrato
      || !Recharge.info.oferta
      || !Recharge.info.amountCharge) {
      Recharge.reset();
      $state.go('app.page.recharge.get_contrato');
    };

    // Cargamos el arreglo de años que usara el campo fecha de vencimiento de la tdc
    $scope.years = [];

    $scope.recharge = {};

    $scope.Amount = Recharge.info.amountCharge;

    var fechaActual = new Date();

    for (var i = 0; i < 15; i++) {
      $scope.years.push( '' + ("" + (fechaActual.getFullYear()+i)).substring(2,4) );
    };

    $scope.$on('pay', function(){

      Recharge.info.stripe = {
        token : $scope.recharge.tokenStripe,
      }

      $state.go('app.page.recharge.confirm');
    });
}]);

app.controller('ConfirmController',
  ['$rootScope', '$scope', '$http', '$state', 'Recharge', 'Sales', '$translate',
  function($rootScope,  $scope, $http, $state, Recharge, Sales, $translate) {

    if (!Recharge.info.contrato
      || !Recharge.info.oferta
      || !Recharge.info.amountCharge
      || !Recharge.info.stripe) {
      Recharge.reset();
      $state.go('app.page.recharge.get_contrato');
    };

    $scope.recharge = Recharge.info;

    /****************************************************
    * update                                            *
    *   @descripcion :: actualiza los datos del usuario *
    *****************************************************/
    $scope.continuar = function(){
      Recharge.apply(function(err, result){
        Sales.refreshResumenSales(function(){});
        $state.go('app.page.recharge.result');
      });
    }

}]);

app.controller('ResultController',
  ['$rootScope', '$scope', '$http', '$state', 'Recharge', '$translate',
  function($rootScope,  $scope, $http, $state, Recharge, $translate) {

    $scope.recharge = Recharge.info;

     if (!Recharge.info.contrato
      || !Recharge.info.oferta
      || !Recharge.info.amountCharge
      || !Recharge.info.stripe) {
      Recharge.reset();
      $state.go('app.page.recharge.get_contrato');
    };

    /****************************************************
    * update                                            *
    *   @descripcion :: actualiza los datos del usuario *
    *****************************************************/
    $scope.continuar = function(){
      $state.go('app.page.recharge.get_contrato');
    }

}]);


app.controller('ReloadController',
  ['$rootScope', '$scope', '$http', '$state', 'Recharge', '$translate', '$stateParams',
  function($rootScope,  $scope, $http, $state, Recharge, $translate, $stateParams) {
    $scope.datos = {
      cod: 'Pais',
      contrato: ''
    };
    if (($stateParams.cod!='')&&($stateParams.contrato!='')){
      console.log("$stateParams");
     $scope.datos.cod = $stateParams.cod;
     $scope.datos.contrato = $stateParams.contrato;
   }
   $scope.recharge = function () {
     $http.post('plataform/sales/recharge', Recharge.info).then(function(response) {
       $scope.recharge = response.data.recharge;
       $scope.$emit('$resetAjax');
     }, function(res) {
       $scope.$emit('$resetAjax');
       $scope.$emit('$errorAjax',res.data);
     });
   }


   var primeAppVar = {}
   primeAppVar.optionsNeeruSelectBox = $('.options-neeru-select-box');
   primeAppVar.selectNeeruOpen = $('.option-neeru');
   primeAppVar.window = $(window);
   $scope.showCountry = false;

   $http.get('plataform/countries').then(function(response) {
     $scope.countries = response.data.paises;
     $scope.$emit('$resetAjax');
   }, function(res) {
     $scope.$emit('$resetAjax');
     $scope.$emit('$errorAjax',res.data);
   });

   $scope.countrySelected = function (id, code, url) {
     primeAppVar.optionsNeeruSelectBox.css('display','none');
     primeAppVar.selectNeeruOpen.css('display','none');
     $scope.showCountry = true;
     $scope.pais = {
       url: 'images/banderas/Venezuela.png',
       ext: '+'+code
     }
   }

   $scope.abrirSelectCountry = function () {
     if (primeAppVar.optionsNeeruSelectBox.css('display') == 'none') {
       primeAppVar.optionsNeeruSelectBox.css('display','block');
       primeAppVar.selectNeeruOpen.css('display','block');
     }
   }

   $http.post('plataform/offers',{
         "phone": "34912509849",//"5491127184499"
         "currency": "EUR",
    })
   .then(function(res){
     $scope.ofertas = res.data;
   }, function(res){
     console.log(res);
   });

}]);
