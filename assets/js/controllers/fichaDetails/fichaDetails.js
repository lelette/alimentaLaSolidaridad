'use strict';

app.controller('fichaDetailsCtrl',
  ['$rootScope', '$scope', '$http', '$state', '$stateParams',
    function ($rootScope, $scope, $http, $state, $stateParams) {
      $scope.representante = true;
      $scope.nino = false;
      $scope.enfermo = false;
      $scope.ficha = {};
      $scope.representante = {};
      $scope.isNino = $stateParams.isNino;
      console.log($scope.isNino);
      $scope.cedula = $stateParams.cedula;


      $scope.buscarDetalles = function() {
        if($scope.isNino == 'true'){
          $http.post('api/nino/getSome', {cedula: $scope.cedula})
          .then(function(res){
           $scope.ficha = res.data.resultado[0]
           $scope.ficha.historial_peso = res.data.resultado[0].historial_peso[0]
          },function(res){
            alert(res.data.error);
          });
        }else{
          $http.post('api/representante/getSome', {cedula: $scope.cedula})
          .then(function(res){
            console.log(res.data);
            $scope.representante = res.data.resultado[0];
            console.log($scope.representante);
          },function(res){
            alert(res.data.error);
          });        }
      };

      $scope.verHistorial = function(){
        $state.go('app.page.historial_peso', {cedula: $scope.cedula, isConsulta: true});
      }

      $scope.buscarDetalles();
      
    }]);
