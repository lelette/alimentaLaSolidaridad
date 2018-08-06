'use strict';

app.controller('recoverPasswordCtrl',
    ['$rootScope', '$scope', '$http', '$state', '$stateParams',
        function ($rootScope, $scope, $http, $state, $stateParams) {
            $scope.username = $rootScope.username;
            console.log("usernameeeeeeeeeee :: ", $scope.username);
            $scope.update = function () {
                if ($scope.user.password == $scope.user.repeatPassword){
                     $http.post('api/user/password', {username: $scope.username, password: $scope.user.password})
                    .then(function (res) {
                        alert('La contraseña se modificó exitosamente');
                        $state.go('app.page.adminficha');
                    }, function (res) {
                        alert(res.data.error);
                    });

                }else{
                    alert('Las contraseñas no coinciden');
                }
               
            }
        }
    ]
);
