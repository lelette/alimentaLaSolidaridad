'use strict';
app.controller('statsCtrl',
['$rootScope', '$scope', '$http', '$state',
function ($rootScope, $scope, $http, $state) {
    $scope.getInfo = function () {
        $http.get('api/user/estadisticas')
          .then(function (res) {
            console.log(res.data);
            $scope.ninos = res.data;
          }, function (res) {
            alert(res.data.error);
          });
        };

        $scope.getInfo();
}]);