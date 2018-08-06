'use strict';

app.controller('createUserCtrl',
    ['$rootScope', '$scope', '$http', '$state', '$stateParams',
        function ($rootScope, $scope, $http, $state, $stateParams) {

            $scope.validatePasswords = function () {
                if ($scope.user.password != $scope.user.repeatPassword) {
                    alert('Las contraseñas no coinciden.');
                    return false;
                } else return true;
            }

            $scope.create = function () {
                if ($scope.validatePasswords() == true) {
                    $http.post('api/user/create', $scope.user)
                        .then(function (res) {
                            alert('El usuario se creo exitosamente');
                            $state.go('app.page.adminficha');
                        }, function (res) {
                            alert(res.data.error);
                        });
                }
            }
        }
    ]
);
