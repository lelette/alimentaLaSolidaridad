'use strict';

app.controller('SigninFormController',
  ['$rootScope', '$scope', '$http', '$state',
    function ($rootScope, $scope, $http, $state) {

      $scope.user = {};
      $scope.loading = false;

      $scope.signin = function () {
        $scope.authError = null;
        $scope.loading = true;
        $http.post('api/user/login', $scope.user)
          .then(function (res) {
            console.log(res);
            $scope.loading = false;
            $rootScope.username = res.data.username;
            $rootScope.isAdmin = res.data.isAdmin;
            $state.go('app.page.adminficha');
          }, function (res) {
            $scope.loading = false;
            alert(res.data.error);
          });
      };

      $scope.forgotPassword = function () {
        if (!$scope.user.username || $scope.user.username == ''){
          alert('Ingresa el nombre de usuario para continuar');
        }else{
          $state.go('access.forgotPass', {username: $scope.user.username});
        }

      }
    }
  ]
);
