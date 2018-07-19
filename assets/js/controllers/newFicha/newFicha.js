'use strict';

/****************************************************************************************
* @description :: define la interaccion necesaria para realizar el registro de usuarios *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('newFichaCtrl',
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
      $scope.ficha_representante.datos = {};
      $scope.ficha_representante.datos.trabaja = false;

      $scope.tipos = [{
          value: 'representante',
          label: 'Representante'
        }, {
          value: 'nino',
          label: 'Niño'
        }];

      $scope.sexos = [{
          value: 'M',
          label: 'Masculino'
        }, {
          value: 'F',
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
        },];

      /******************************** FIN DE LAS VARIABLES GLOBALES *****************************/
      /******************************** FUNCIONES DEL CONTROLADOR *****************************/
    
      $scope.createKid = function(datos) {
        if ($scope.validateInputs() == true){
          $http.post('api/nino/create', datos)
          .then(function(res){
            alert('La ficha se creo exitosamente');
            $state.go('app.page.adminficha');
          },function(res){
            alert(res.data.error);
            //console.log(res);
          });
        }
      };

      $scope.validateInputs = function(){
        if (!$scope.ficha.nino.representante) {
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


      $scope.createParent = function() {
        
        var enviar = $scope.ficha_representante.datos;
        enviar.sexo = $scope.ficha_representante.sexoSelect.value;
        enviar.estado_civil = $scope.ficha_representante.edoCivilSelect.value;
        if ($scope.validateParentInputs() == true){
          $http.post('api/representante/create', enviar)
          .then(function(res){
            alert('La ficha se creo exitosamente');
            $state.go('app.page.adminficha');
          },function(res){
            alert(res.data.error);
            //console.log(res);
          });
        }
      };


      $scope.validateParentInputs = function(){
        if (!$scope.ficha_representante.datos.sector) {
          alert('Debe ingresar el sector del representante.');
          return false;
        }else
        if (!$scope.ficha_representante.datos.parroquia) {
          alert('Debe ingresar la parroquia del representante.');
          return false;
        }else
        if (!$scope.ficha_representante.datos.nombres) {
          alert('Debe ingresar el(los) nombres(s) del representante.');
          return false;
        }else
        if (!$scope.ficha_representante.datos.apellidos) {
          alert('Debe ingresar el(los) apellido(s) del representante.');
          return false;
        }else
        if (!$scope.ficha_representante.datos.cedula) {
          alert('Debe ingresar la cedula del representante.');
          return false;
        }else
        if (!$scope.ficha_representante.datos.fecha_nacimiento) {
          alert('Debe ingresar la fecha de nacimiento del representante.');
          return false;
        }else
        if (!$scope.ficha_representante.datos.telefono) {
          alert('Debe ingresar el telefono del representante.');
          return false;
        }
        if (!$scope.ficha_representante.sexoSelect.value) {
          alert('Debe ingresar el sexo del representante.');
          return false;
        }
        if (!$scope.ficha_representante.edoCivilSelect.value) {
          alert('Debe ingresar el sexo del representante.');
          return false;
        }else{
          return true;
        }
      }




        /******************************** FIN DE FUNCIONES DEL CONTROLADOR *****************************/


    }]);
