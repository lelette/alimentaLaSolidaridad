'use strict';

app.controller('FichaCtrl',
  ['$rootScope', '$scope', '$http', '$state', '$uibModal',
    function ($rootScope, $scope, $http, $state, $uibModal) {
      $scope.representante = true;
      $scope.nino = false;
      $scope.enfermo = false;
      $scope.ninos = [];
      $scope.representantes = [];
      $scope.searchTerm = '';
      var busqueda = '';
      

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

      $scope.activar = function (ficha) {
        if ($scope.tipoFicha.value == 'nino') {
          var datos = {};
          datos.representante = ficha.representante;
          datos.activo = ficha.activo;
          var r = confirm("Para confirmar que desea inactivar esta ficha presione OK.");
          if (r == true) {
            $http.post('api/nino/changeStatus', datos)
              .then(function (res) {
                if (datos.activo == true) {
                  alert('Nino activado');
                } else {
                  alert('Nino inactivado');
                }
              }, function (res) {
                alert(res.data.error);

              });
          }
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
                    alert('Representante activado');
                  } else {
                    alert('Representante inactivado');
                  }
                }, function (res) {
                  alert(res.data.error);

                });
            }
          }
        }

      }

      $scope.eliminar = function (ficha) {
        var r = confirm("Para confirmar que desea eliminar esta ficha presione OK.");
        if (r == true) {
          $http.post('api/nino/delete', { cedula: ficha.cedula })
            .then(function (res) {
              $state.reload();
              alert(res.data.ok);
            }, function (res) {
              alert(res.data.error);
            });
        }
      };

      $scope.filtrar = function () {
        var nombre = /^[a-zA-Z\s]*$/;
        var cedula = /^[VE]-\d+(\.\d+)?$/;
        busqueda = '';
        var apellidos = '';
        if ($scope.searchTerm.split(' ')[1] != undefined){
          apellidos = '%20' + $scope.searchTerm.split(' ')[1];
        }
        if (nombre.test($scope.searchTerm)) {
          busqueda = '&nombreCompleto=' + $scope.searchTerm.split(' ')[0]+apellidos ;
        }
        else if (cedula.test($scope.searchTerm)) {
          busqueda = '&cedula=' + $scope.searchTerm;
        }
        else {
          busqueda = '';
        }

        if ($scope.tipoFicha.value == 'nino') {
          $http.get('api/nino/searchBar?' + busqueda)
            .then(function (respuesta) {
              busqueda = '';
              $scope.ninos = respuesta.data.resultado;
            }, function (respuesta) {
              busqueda = '';
            });
        } else {
          if ($scope.tipoFicha.value == 'representante') {
            $http.get('api/representante/searchBar?' + busqueda)
              .then(function (respuesta) {
                busqueda = '';
                $scope.representantes = respuesta.data.resultado;
              }, function (respuesta) {
                busqueda = '';
              });
          }
        }
      }

      $scope.newUser = function(){
        $state.go('app.page.newUser');
      }

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

      $scope.cambiarImagen = function(ficha){

      }


      $scope.imageChange = function () {
        var modalInstance = $uibModal.open({
          templateUrl: 'templates/modals/modalChangeImage.html',
          controller: 'ImgChangeCtrl',
          backdrop: 'static',
          resolve: {
            dataScope:function() {
              return {
                user: $scope.user
              }
            }
          }
        });
      }
    





    }]);


    