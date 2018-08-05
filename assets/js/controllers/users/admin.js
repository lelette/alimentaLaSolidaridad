'use strict';

app.controller('adminUserCtrl',
    ['$rootScope', '$scope', '$http', '$state', '$stateParams',
        function ($rootScope, $scope, $http, $state, $stateParams) {
            var busqueda = '';

            $scope.getAllUsers = function () {
                $http.get('api/user/getAll')
                    .then(function (res) {
                        $scope.usuarios = res.data.usuarios;
                        console.log(res.data);
                    }, function (res) {
                        alert(res.data.error);
                    });
            };

            $scope.filtrar = function () {
                var nombre = /^[a-zA-Z\s]*$/;
                busqueda = '';
                if (nombre.test($scope.searchTerm)) {
                    busqueda = '&username=' + $scope.searchTerm ;
                  }
                $http.get('api/user/get?' + busqueda)
                    .then(function (respuesta) {
                        busqueda = '';
                        $scope.usuarios = respuesta.data.resultado;
                    }, function (respuesta) {
                        busqueda = '';
                    });
            }


            $scope.eliminar = function (user) {
                var r = confirm("Para confirmar que desea eliminar este usuario, presione OK.");
                if (r == true) {
                    console.log(user);
                  $http.post('api/user/delete', { username: user.username })
                    .then(function (res) {
                      $state.reload();
                      alert(res.data.ok);
                    }, function (res) {
                      alert(res.data.error);
                    });
                }
              };

              $scope.modificar = function(user){
                $state.go('app.page.updateUser', { username: user.username })

              }

            $scope.getAllUsers();
        }
    ]
)