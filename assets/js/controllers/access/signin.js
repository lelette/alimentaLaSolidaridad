'use strict';

app.controller('SigninFormController',
  ['$rootScope', '$scope', '$http', '$state',
  function($rootScope, $scope, $http, $state) {

  $rootScope.header = {}
  $rootScope.header.icono = "images/icoMiPerfil.png";
  $rootScope.header.namePage = "signin.subtitulo";
  $scope.fbLogin = '';
  $scope.user = {};
  $scope.authError = null;
  $scope.loading = false;

  $scope.signin = function() {
    $scope.authError = null;
    $state.go('app.page.adminficha');

  };

}]);
