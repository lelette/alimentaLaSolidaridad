'use strict';

app.controller('updateFichaCtrl',
  ['$rootScope', '$scope', '$http', '$state',   'toaster', '$stateParams',
    function ($rootScope, $scope, $http, $state, toaster, $stateParams) {
      /******************************** VARIABLES GLOBALES *****************************/

      $scope.representante = true;
      $scope.nino = false;
      $scope.enfermo = false;
      $scope.ficha = {}
      $scope.ficha.nino = {};
      $scope.ficha.nino.isEnfermo = false;
      $scope.ficha.nino.estudia=false;
      $scope.ficha_representante = {};

      $scope.isNino = $stateParams.isNino;
      $scope.cedula = $stateParams.cedula;

      $scope.tipos = [{
          value: 'representante',
          label: 'Representante'
        }, {
          value: 'nino',
          label: 'Niño'
        }];

      $scope.sexos = [{
          value: 'm',
          label: 'Masculino'
        }, {
          value: 'f',
          label: 'Femenino'
        }];
      $scope.estadosciviles = [{
        value: 'soltero/a',
        label: 'Soltero/a'
        }, {
          value: 'divorciado/a',
          label: 'Divorciado/a'
        },
        {
          value: 'viudo/a',
          label: 'Viduo/a'
        }, {
          value: 'casado/a',
          label: 'Casado/a'
        }];

      /******************************** FIN DE LAS VARIABLES GLOBALES *****************************/
      /******************************** FUNCIONES DEL CONTROLADOR *****************************/
    
      $scope.buscarDetalles = function() {
        if($scope.isNino == 'true'){
          $http.post('api/nino/getSome', {cedula: $scope.cedula})
          .then(function(res){
           $scope.ficha.nino = res.data.resultado[0]
           $scope.ficha.historial_peso = res.data.resultado[0].historial_peso[0]
          },function(res){
            alert(res.data.error);
            //console.log(res);
          });
        }else{
          $http.post('api/representante/getSome', {cedula: $scope.cedula})
          .then(function(res){
           $scope.ficha_representante = res.data.resultado[0]
          },function(res){
            alert(res.data.error);
            //console.log(res);
          });        }
      };

      $scope.buscarDetalles();

      $scope.validateInputs = function(){
        if (!$scope.ficha.nino.id_representante) {
          alert('Debe ingresar No. de ficha del representante del niño.');
          return false;
        }else
        if (!$scope.ficha.nino.nombres) {
          alert('Debe ingresar el(los) nombre(s) del niño.');
          return false;
        }else
        if (!$scope.ficha.nino.apellidos) {
          alert('Debe ingresar el(los) apellido(s) del niño.');
          return false;
        }else
        if (!$scope.ficha.nino.cedula) {
          alert('Debe ingresar la cedula del niño.');
          return false;
        }else
        if (!$scope.ficha.nino.fecha_nacimiento) {
          alert('Debe ingresar la fecha de nacimiento del niño.');
          return false;
        }else{
          return true;
        }
      }

      $scope.modificarKid = function(datos){
        if ($scope.validateInputs() == true){
          $http.post('api/nino/update', datos)
          .then(function(res){
            alert('La ficha se modifico exitosamente');
            $state.go('app.page.adminficha');
          },function(res){
            alert(res.data.error);
            //console.log(res);
          });
        }
      }


        /******************************** FIN DE FUNCIONES DEL CONTROLADOR *****************************/


    }]);
