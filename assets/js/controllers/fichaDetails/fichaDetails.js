'use strict';

app.controller('fichaDetailsCtrl',
  ['$rootScope', '$scope', '$http', '$state', '$stateParams',
    function ($rootScope, $scope, $http, $state, $stateParams) {
      $scope.representante = true;
      $scope.nino = false;
      $scope.enfermo = false;
      $scope.ficha = {};
      $scope.isNino = $stateParams.isNino;
      $scope.cedula = $stateParams.cedula;


      $scope.buscarDetalles = function() {
        if($scope.isNino == 'true'){
          $http.post('api/nino/getSome', {cedula: $scope.cedula})
          .then(function(res){
           $scope.ficha = res.data.resultado[0]
           $scope.ficha.historial_peso = res.data.resultado[0].historial_peso[0]
          },function(res){
            alert(res.data.error);
            //console.log(res);
          });
        }else{
          console.log("is representante");
        }
      };

      $scope.buscarDetalles();
      
    }]);
