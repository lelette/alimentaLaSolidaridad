'use strict';

/****************************************************************************************
* @description :: define la interaccion necesaria para realizar el registro de usuarios *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('applyValEmailController',
  ['$rootScope', '$scope', '$http', '$state', '$translate', '$location',
  function($rootScope,  $scope, $http, $state, $translate, $location) {

  $scope.val = undefined;

  var datos = {};

  if($location.search().rel) datos.rel = $location.search().rel;
  else $scope.val = 'error';
  if($location.search().data) datos.data = $location.search().data;
  else $scope.val = 'error';
  if($location.search().code) datos.code = $location.search().code;
  else $scope.val = 'error';

  if ($scope.val != 'error') {
    var urlVal = 'plataform/validation/apply?code='+datos.code +'&rel='+datos.rel+'&data='+datos.data;

    $http.get(urlVal)
    .then(function(response){
      $scope.val = true;
    },function(res){
      $scope.val = 'error';
    });
  };


}]);
