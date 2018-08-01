'use strict';

app.controller('FichaCtrl',
  ['$rootScope', '$scope', '$http', '$state',
    function ($rootScope, $scope, $http, $state) {
      $scope.representante = true;
      $scope.nino = false;
      $scope.enfermo = false;
      $scope.ninos = [];
      $scope.representantes = [];


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
            console.log($scope.representantes);
          }, function (res) {
            alert(res.data.error);
          });
      };

      $scope.activar = function (ficha) {
        if ($scope.tipoFicha.value == 'nino') {

        } else {
          if ($scope.tipoFicha.value == 'representante') {
            var padres = {};
            padres.cedula = ficha.cedula;
            padres.activo = ficha.activo;
            var r = confirm("Al inactivar un representante se inactivaran las fichas de los ninos asociados a el, si aún desea hacerlo presione OK.");
            if (r == true) {
              $http.post('api/representante/changeStatus', padres)
                .then(function (res) {
                  if (padres.activo == true) {
                    alert('Representante inactivado');
                  } else {
                    alert('Representante activado');
                  }
                  $state.go('app.page.adminficha');
                }, function (res) {
                  alert(res.data.error);
                });
            }
          }
        }

      }

      $scope.eliminar = function (ficha) {
        $http.post('api/nino/delete', { cedula: ficha.cedula })
          .then(function (res) {
            $state.reload();
            alert(res.data.ok);
          }, function (res) {
            alert(res.data.error);
          });
      };

      $scope.select = function () {
        if ($scope.tipoFicha.value == 'nino') {
          $scope.getAll();
        } else {
          if ($scope.tipoFicha.value == 'representante') {
            $scope.getAllParents();
          }
        }
      };

      $scope.modificar = function (ficha) {
        if ($scope.tipoFicha.value == 'nino') {
          $state.go('app.page.updateForm', { isNino: true, cedula: ficha.cedula });
        } else {
          if ($scope.tipoFicha.value == 'representante') {
            $state.go('app.page.updateForm', { isNino: false, cedula: ficha.cedula })
          }
        }
      }

      $scope.verDetalles = function (ficha) {
        if ($scope.tipoFicha.value == 'nino') {
          $state.go('app.page.formDetails', { isNino: true, cedula: ficha.cedula });
        } else {
          if ($scope.tipoFicha.value == 'representante') {
            $state.go('app.page.formDetails', { isNino: false, cedula: ficha.cedula })
          }
        }
      }


      $scope.historiales = function (ficha) {
        if ($scope.tipoFicha.value == 'nino') {
          $state.go('app.page.historial_peso', { cedula: ficha.cedula, isConsulta: false });
        }
      }

      $scope.eliminarRepresentante = function (ficha) {
        var r = confirm("Al eliminar un representante se eliminaran las fichas de los ninos asociados a el, si aún desea eliminarlo presione OK.");
        if (r == true) {
          $http.post('api/representante/delete', { cedula: ficha.cedula })
            .then(function (res) {
              $state.reload();
              alert(res.data.ok);
            }, function (res) {
              alert(res.data.error);
            });
        }
      };





    }]);
