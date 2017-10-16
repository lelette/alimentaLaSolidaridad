'use strict';

/****************************************************************************************
* @description :: define la interaccion necesaria para realizar el registro de usuarios *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('movController',
  ['$rootScope', '$scope', '$http', '$state', '$translate',
  function($rootScope,  $scope, $http, $state, $translate) {
    $rootScope.header = {}
    $rootScope.header.icono = "images/icoMovimientos.png";
    $rootScope.header.namePage = "Movimientos";
    $scope.datos = { sales : []} ;

    // variables para control de paginacion
    $scope.techo = undefined;
    $scope.currentPage = 1;
    $scope.pageSize = 10;

    /**************************************************************************
    * consultar                                                               *
    * @descripcion :: consulta las transacciones realizadas en el sistema     *
    ***************************************************************************/
    $scope.consultar = function(page){
      if ( ($scope.techo && ($scope.currentPage >= $scope.techo) ) || page == 0) {
        $scope.msjmov = true;
        $scope.tablemov = false;
        return;
      };

      $http.get('plataform/sale/getTransactions?page='+page+'&limit=10')
      .then(function(res){
        console.log('res.data', res.data);
        if (res.data.sales.length == 0 && (page) > 1) {
            $scope.techo = page-1;
            $scope.consultar(page-1);
        }else{
          $scope.msjmov = false;
          $scope.tablemov = true;
          $scope.datos.sales.splice(0,$scope.datos.sales.length);
          $scope.currentPage = page;
          res.data.sales.forEach(function(sale){
            // detectamos el email principal
            sale.phone = '041x - xxxxxxx';
            sale.action = "<img src='images/icoEliminar.png' />";
            $scope.datos.sales.push(sale);
          });
        };
      }, function(res){
        console.log('res.data',res.data);
        $scope.msjmov = false;$scope.tablemov = true;
        $scope.$emit('$errorAjax',res.data);
      });
    }

    $scope.consultar(1);

}]);


app.controller('DetailsController',
  ['$rootScope', '$scope', '$http', '$state', '$translate',
  function($rootScope,  $scope, $http, $state, $translate) {



}]);
