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
    console.log('Recharge', Recharge);
    $scope.datos = {
      cod: 'Pais',
      contrato: '',
      operadora: ''
    };

    $scope.pais = {}

    $scope.showOffers   = false;
    $scope.showOperator = false;
    $scope.showCountry = false;

  //   if (($stateParams.cod!='')&&($stateParams.contrato!='')){
  //     console.log("$stateParams");
  //    $scope.datos.cod = $stateParams.cod;
  //    $scope.datos.contrato = $stateParams.contrato;
  //  }


   $scope.recharge = function () {
     $http.post('plataform/sales/recharge', Recharge.info).then(function(response) {
       $scope.recharge = response.data.recharge;
       $scope.$emit('$resetAjax');
     }, function(res) {
       $scope.$emit('$resetAjax');
       $scope.$emit('$errorAjax',res.data);
     });
   }

   if (Recharge.info.pais && Recharge.info.pais.codigo && Recharge.info.pais.numero && Recharge.info.pais.url
     && Recharge.info.pais.operadora && Recharge.info.ofertas) {

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

   $scope.countrySelected = function (country) {
     $scope.showCountry = true;
     $scope.pais = {
       url: 'images/banderas/'+country.name+'.png',
       cod: '+'+country.phone_code
     };
     $scope.datos.cod = country.phone_code;
   };

   $scope.obtenerOfertas = function (){
     $scope.showOffers = false;
     var numero = $scope.datos.contrato;
     var cod = Recharge.info.pais.codigo | $scope.datos.cod;
    if (cod && numero) {
      $http.post('plataform/offers',{
            // Telefono de reales --> España "34912509849" ; Argentina "5491127184499"
            "phone":  cod+numero,
            "currency": "EUR",
       }).then(function(res){
         var ofertas = res.data;
         var operadora = $scope.ofertas.operadora;
         console.log('Recharge', Recharge);
         Recharge.info.ofertas = ofertas;
         Recharge.info.pais = {
           codigo: cod,
           numero: numero,
           operadora: operadora
         }
        $scope.ofertas = Recharge.info.ofertas;
        $scope.showOffers = true; $scope.showOperator = true;
        console.log('Recharge', Recharge);
      }, function(res){
        $scope.showOffers = false;
        console.log(res);
      });
    }
   }

}]);
