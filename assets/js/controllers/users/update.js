'use strict';

app.controller('updateUserCtrl',
    ['$rootScope', '$scope', '$http', '$state', '$stateParams',
        function ($rootScope, $scope, $http, $state, $stateParams) {
            $scope.username = $stateParams.username;

            $scope.getUser = function(){
                $http.get('api/user/get', {username: $scope.username})
                .then(function(res){
                    $scope.user = res.data.resultado[0];
                })
            }

            $scope.getUser();
            $scope.update = function () {
                $http.post('api/user/update', $scope.user)
                    .then(function (res) {
                        alert('El usuario se modifico exitosamente');
                        $state.go('app.page.adminficha');
                    }, function (res) {
                        alert(res.data.error);
                    });

            }
        }
    ]
);
