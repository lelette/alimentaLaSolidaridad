'use strict';

app.controller('historialCtrl',
  ['$rootScope', '$scope', '$http', '$state', '$stateParams',
    function ($rootScope, $scope, $http, $state, $stateParams) {
      $scope.representante = true;
      $scope.nino = false;
      $scope.enfermo = false;
      $scope.ficha = {};
  //    $scope.isNino = $stateParams.isNino;
      $scope.cedula = $stateParams.cedula;
      $scope.historiales = []


      $scope.buscarDetalles = function() {
          $http.post('api/nino/getSome', {cedula: $scope.cedula})
          .then(function(res){
              console.log(res.data)
           $scope.historiales = res.data.resultado[0].historial_peso;
          },function(res){
            alert(res.data.error);
            //console.log(res);
          });
        
      };

      $scope.buscarDetalles();
      
    }]);
