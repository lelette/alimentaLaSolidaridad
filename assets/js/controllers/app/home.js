'use strict';

/****************************************************************************************
* @description :: Informacion y funciones del homepage *
* @autor :: Marialette Argulles marguelles@transamovil.com                                       *
*****************************************************************************************/

app.controller('HomeCtrl',
  ['$rootScope', '$scope', '$http', '$state', 'Recharge', '$translate', 'User',
  function($rootScope, $scope, $http, $state, Recharge, $translate, User) {

    $scope.datos  = {
      tdcAfiliadas: 0,
      frecuentes: 0,
      recargas: 0
    };



    User.refresh(function(err){
      if (err) {
        return $state.go('access.signin');
      }
      $scope.user = User.info;
      $scope.user.imagen_perfil = User.info.imagen_perfil;
      $scope.user.pin = User.info.pin;
      if (User.info.imagen_perfil.match('http')) $scope.user.imagen_perfil = User.info.imagen_perfil;
      else $scope.user.imagen_perfil = $rootScope.apiUrl+'/'+User.info.imagen_perfil;
      $rootScope.usernombre = $scope.user.nombres;
      console.log($rootScope.usernombre);
      // Variables fijas del SUBHeader
      $rootScope.header = {}
      $rootScope.header.icono = "images/icoInicio.png";
      $rootScope.header.home = true;
      $rootScope.header.namePage = $scope.user.nombres;
    });


    $scope.pais = {}

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

    $scope.obtenerOfertas = function (){
      var numero = $scope.contrato;
      var cod = $scope.pais.ext;
      var url = $scope.pais.url;
     if (cod && numero) {
       $http.post('plataform/offers',{
             // Telefono de reales --> España "34912509849" ; Argentina "5491127184499"
             "phone":  cod+numero,
             "currency": "EUR",
        }).then(function(res){
         var ofertas = res.data;
         var operadora = ofertas.operadora;
         Recharge.info.ofertas = ofertas;
         Recharge.info.pais = {
           codigo: cod,
           numero: numero,
           url: url,
           operadora: operadora
         }
        $state.go('app.page.recharge');
       }, function(res){
         $scope.ShowOffers = false;
         console.log(res);
       });
     }
    }

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
    $scope.loader='mostrar';
    $scope.cuerpo='ocultar';
    $http.get('platform/stripe/getCards')
    .then(function(res){
      $scope.loader = 'ocultar';
      $scope.cuerpo = 'mostrar';
      console.log("hello");
      $scope.datos.tdcAfiliadas = res.data.data.length;
    }, function(error){
      $scope.loader = 'ocultar';
      $scope.cuerpo = 'mostrar';
      $scope.datos.tdcAfiliadas = 0;
    })

    //************************ FIN DE CARGA DE CONTROLADOR **************************

  //   //************************* FUNCIONES DEL CONTROLADOR **************************
  //   /** REDIRECT
  //   * description: funcion para redirigir al usuario al flujo de recarga
  //   **/
  //   $scope.redirect = function (){
  //    if (($scope.count!=0)&&($scope.count == 10)){
  //      var cod = " ";
  //      var contrato = $scope.contrato;
  //      $state.go('app.page.recharge', {cod: cod, contrato: contrato});
  //    }
  //  }
  //  //************************ FIN DE FUNCIONES DEL CONTROLADOR **************************

}]);
