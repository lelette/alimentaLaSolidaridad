'use strict';

/****************************************************************************************
* @description :: define la interaccion necesaria para realizar el registro de usuarios *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('TransactionsController',
  ['$rootScope', '$scope', '$http', '$state', '$translate',
  function($rootScope,  $scope, $http, $state, $translate) {


    $scope.datos = { sales : []} ;

    // variables para control de paginacion
    $scope.techo = undefined;
    $scope.currentPage = 1;
    $scope.pageSize = 5;

    /**************************************************************************
    * consultar                                                               *
    * @descripcion :: consulta las transacciones realizadas en el sistema     *
    ***************************************************************************/
    $scope.consultar = function(page){
      if ( ($scope.techo && ($scope.currentPage >= $scope.techo) ) || page == 0) {
        return ;
      };

      $http.get('plataform/sale/getAllTransactions?page='+page+'')
      .then(function(res){
        if (res.data.sales.length == 0 && (page) > 1) {
            $scope.techo = page-1;
            $scope.consultar(page-1);
        }else{
          $scope.datos.users = [];
          $scope.currentPage = page;
          res.data.sales.forEach(function(sale){
            // detectamos el email principal
            $scope.datos.sales.push(sale);
          });
        };
      }, function(res){
        console.log(res.data);
      });
    }

    $scope.consultar(1);

}]);
