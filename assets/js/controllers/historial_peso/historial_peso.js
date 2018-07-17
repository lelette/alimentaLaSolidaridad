'use strict';

app.controller('historialCtrl',
  ['$rootScope', '$scope', '$http', '$state', '$stateParams',
    function ($rootScope, $scope, $http, $state, $stateParams) {
      $scope.representante = true;
      $scope.nino = false;
      $scope.enfermo = false;
      $scope.historial_peso = {};
      //    $scope.isNino = $stateParams.isNino;
      $scope.cedula = $stateParams.cedula;
      $scope.historiales = []


      $scope.buscarDetalles = function () {
        $http.post('api/nino/getSome', { cedula: $scope.cedula })
          .then(function (res) {
            console.log(res.data)
            $scope.historiales = res.data.resultado[0].historial_peso;
          }, function (res) {
            alert(res.data.error);
            //console.log(res);
          });
      };

      $scope.buscarDetalles();


      $scope.eliminarUno = function (datos) {
        var enviar = {
          id: datos.id
        }
        console.log(datos);
        $http.post('api/historial/eliminar', enviar)
          .then(function (res) {
            $state.reload();
          },
            function (error) {
              alert(error.data.error);
            })
      }


      $scope.agregarUno = function () {
        $state.go('app.page.newHistory', {cedula: $scope.cedula})
      }

      $scope.agregar = function(){
        var datos = $scope.historial_peso;
        datos.cedula = $scope.cedula;
        if ($scope.validateInputs() == true){
          $http.post('api/historial/agregar', datos)
          .then(function (res) {
            $state.go('app.page.historial_peso', {cedula: $scope.cedula});          },
            function (error) {
              alert(error.data.error);
              $state.go('app.page.historial_peso', {cedula: $scope.cedula});          
            })
        }
      }

      $scope.validateInputs = function(){
        if (!$scope.historial_peso.peso) {
          alert('Debe ingresar el peso del niño.');
          return false;
        }else
        if (!$scope.historial_peso.circunferencia_brazo) {
          alert('Debe ingresar las medidas de la circunferencia del brazo del niño.');
          return false;
        }else
        if (!$scope.historial_peso.circunferencia_cabeza) {
          alert('Debe ingresar las medidas de la circunferencia cabeza del niño.');
          return false;
        }else
        if (!$scope.historial_peso.altura) {
          alert('Debe ingresar la altura del niño.');
          return false;
        }else
        if (!$scope.historial_peso.diagnostico) {
          alert('Debe ingresar el diagnostico del niño.');
          return false;
        }else{
          return true;
        }
      }

    }]);
