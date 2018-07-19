'use strict';

app.controller('FichaCtrl',
  ['$rootScope', '$scope', '$http', '$state',
    function ($rootScope, $scope, $http, $state) {
      $scope.representante = true;
      $scope.nino = false;
      $scope.enfermo = false;
      $scope.ninos = [];
      $scope.representantes= [];


      $scope.tipos = [{
        value: 'representante',
        label: 'Representante'
      }, {
        value: 'nino',
        label: 'Niño'
      }];
      $scope.getAll = function () {
        $http.get('api/nino/getAll')
          .then(function (res) {
            $scope.ninos = res.data.ninos;
          }, function (res) {
            alert(res.data.error);
          });
      };

      $scope.getAllParents = function () {
        $http.get('api/representante/getAll')
          .then(function (res) {
            $scope.representantes = res.data.todas;
          }, function (res) {
            alert(res.data.error);
          });
      };

      $scope.eliminar = function (ficha) {
        $http.post('api/nino/delete', {cedula:ficha.cedula})
          .then(function (res) {
            $state.reload();
            alert(res.data.ok);
          }, function (res) {
            alert(res.data.error);
          });
      };

      $scope.select = function () {
        if ($scope.tipoFicha.value == 'nino'){
          $scope.getAll();
        }else{
          if ($scope.tipoFicha.value == 'representante'){
            $scope.getAllParents();           
          }
        }
      };

      $scope.modificar = function(ficha){
        if ($scope.tipoFicha.value == 'nino'){
          $state.go('app.page.updateForm', {isNino: true, cedula: ficha.cedula});
        }else{
          if ($scope.tipoFicha.value == 'representante'){
            $state.go('app.page.updateForm', {isNino: false, cedula: ficha.cedula})
          }
        }
      }

      $scope.verDetalles = function(ficha){
        if ($scope.tipoFicha.value == 'nino'){
          $state.go('app.page.formDetails', {isNino: true, cedula: ficha.cedula});
        }else{
          if ($scope.tipoFicha.value == 'representante'){
            $state.go('app.page.formDetails', {isNino: false, cedula: ficha.cedula})
          }
        }
      }
      

      $scope.historiales = function(ficha){
        if ($scope.tipoFicha.value == 'nino'){
          $state.go('app.page.historial_peso', {cedula: ficha.cedula});
        }
      }

      $scope.eliminarRepresentante = function (ficha) {
        $http.post('api/representante/delete', {cedula:ficha.cedula})
          .then(function (res) {
            $state.reload();
            alert(res.data.ok);
          }, function (res) {
            alert(res.data.error);
          });
      }; 

      
    
    
    
    }]);
