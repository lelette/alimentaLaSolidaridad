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


        /******************************** FIN DE FUNCIONES DEL CONTROLADOR *****************************/


    }]);
