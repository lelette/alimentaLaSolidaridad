'use strict';

app.controller('GlobalCtrl',
  ['$rootScope', '$scope', '$http', '$state',
    function ($rootScope, $scope, $http, $state) {
      $scope.loader = 'ocultar';
      $scope.cuerpo = 'mostrar';
      $scope.cart = [];
      var element = angular.element('.main-content');
      var name = element.attr('ui-view');

      $scope.logout = function () {
        $http.post('api/user/logout')
          .then(function (res) {
            $state.go('login');
          });
      }; 

      $scope.refresh = function () {
        $state.go('app.page.adminficha');
      }

    }]);
