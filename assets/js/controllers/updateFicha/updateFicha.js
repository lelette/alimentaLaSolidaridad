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
      $scope.update = {};
      $scope.update.nino = {};
      $scope.update.historial_peso = {};

      $scope.isNino = $stateParams.isNino;
      console.log($scope.isNino);
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
        console.log($scope.isNino);
        if($scope.isNino == 'true'||$scope.isNino==true){
          $http.post('api/nino/getSome', {cedula: $scope.cedula})
          .then(function(res){
            console.log(res.data.resultado[0]);
           $scope.ficha.nino = res.data.resultado[0]
           $scope.ficha.historial_peso = res.data.resultado[0].historial_peso[0];
          },function(res){
            alert(res.data.error);
            //console.log(res);
          });
        }else{
          $http.post('api/representante/getSome', {cedula: $scope.cedula})
          .then(function(res){
           $scope.ficha_representante = res.data.resultado[0]
           if ($scope.ficha_representante.sexo == 'F'){
             $scope.ficha_representante.sexoSelect = {
              value: 'f',
              label: 'Femenino'
            }
           }else{
             $scope.ficha_representante.sexoSelect = {
              value: 'm',
              label: 'Masculino'
            }
           }
           $scope.ficha_representante.edoCivilSelect = {
            value: $scope.ficha_representante.estado_civil,
            label: $scope.ficha_representante.estado_civil.substring(0,1).toUpperCase() + $scope.ficha_representante.estado_civil.substring(1)
          }
                  },function(res){
            alert(res.data.error);
          });        }
      };

      $scope.buscarDetalles();

      $scope.validateInputs = function(){
        if (!$scope.ficha.nino.nombres) {
          alert('Debe ingresar el(los) nombre(s) del niño.');
          return false;
        }else
        if (!$scope.ficha.nino.apellidos) {
          alert('Debe ingresar el(los) apellido(s) del niño.');
          return false;
        }else
        if (!$scope.ficha.nino.fecha_nacimiento) {
          alert('Debe ingresar la fecha de nacimiento del niño.');
          return false;
        }else{
          return true;
        }
      }

      $scope.validateInputsParents = function(){
        if (!$scope.ficha_representante.nombres) {
          alert('Debe ingresar el(los) nombre(s) del representante.');
          return false;
        }else
        if (!$scope.ficha_representante.apellidos) {
          alert('Debe ingresar el(los) apellido(s) del representante.');
          return false;
        }else
        if (!$scope.ficha_representante.fecha_nacimiento) {
          alert('Debe ingresar la fecha de nacimiento del representante.');
          return false;
        }
        else{
          return true;
        }
      }

      $scope.modificarKid = function(datos){
        if ($scope.validateInputs() == true){
          $scope.validateData();
          $http.post('api/nino/update', $scope.update)
          .then(function(res){
            console.log(res.data);
            alert('La ficha se modifico exitosamente');
            $state.go('app.page.adminficha');
          },function(res){
            alert(res.data.error);
          });
        }
      }

      $scope.modificarParent = function(){
        if ($scope.validateInputsParents() == true){
          $http.post('api/representante/update', $scope.ficha_representante)
          .then(function(res){
            alert('La ficha se modifico exitosamente');
            $state.go('app.page.adminficha');
          },function(res){
            alert(res.data.error);
          });
        }
      }

      $scope.validateData = function(){
        $scope.update.nino.nombres = $scope.ficha.nino.nombres;
        $scope.update.nino.apellidos = $scope.ficha.nino.apellidos;
        $scope.update.nino.cedula = $scope.ficha.nino.cedula;
        $scope.update.nino.nombres = $scope.ficha.nino.nombres;
        $scope.update.nino.fecha_nacimiento = $scope.ficha.nino.fecha_nacimiento;
        $scope.update.nino.estudia = $scope.ficha.nino.estudia;
        $scope.update.nino.colegio = $scope.ficha.nino.colegio;
        $scope.update.nino.grado = $scope.ficha.nino.grado;
        $scope.update.nino.direccion_colegio = $scope.ficha.nino.direccion_colegio;
        $scope.update.nino.isEnfermo = $scope.ficha.nino.isEnfermo;
        $scope.update.nino.enfermedad = $scope.ficha.nino.enfermedad;
        $scope.update.nino.alergia = $scope.ficha.nino.alergia;
        $scope.update.nino.medicamentos = $scope.ficha.nino.medicamentos;
        $scope.update.historial_peso = $scope.ficha.historial_peso;
      }


        /******************************** FIN DE FUNCIONES DEL CONTROLADOR *****************************/


    }]);
