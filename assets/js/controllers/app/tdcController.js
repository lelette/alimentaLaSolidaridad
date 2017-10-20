'use strict';

/****************************************************************************************
* @description :: Define todas las funciones que manejan las tarjetas de credito        *
* @autor       :: Javier Stifano <jstifano@transamovil.com>                             *
*****************************************************************************************/

app.controller('tdcCtrl',
  ['$rootScope', '$scope', '$http', '$state','$translate',
  function($rootScope, $scope, $http, $state,$translate) {

    // Variables fijas del Header
    $rootScope.header = {}
    $rootScope.header.icono = "images/icoTDCAfiliada.png";
    $rootScope.header.namePage = "TDC Afiliadas";

    $scope.msjmov = true;
}]);
