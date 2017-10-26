'use strict';

/****************************************************************************************
* @description :: define la interaccion necesaria para realizar el registro de usuarios *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/
function verMovDetalle (id) {
  window.location.assign("http://localhost:9000/app/page/transactionDetail/"+id)
}


app.controller('movController',
  ['$rootScope', '$scope', '$http', '$state', '$translate',
  function($rootScope,  $scope, $http, $state, $translate) {
    $rootScope.header = {}
    $rootScope.header.icono = "images/icoMovimientos.png";
    $rootScope.header.namePage = "Movimientos";
    $scope.datos = { sales : [] };

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
        var ventas = res.data.sales;
        if (ventas.length == 0) {
          $scope.msjmov = true;
          $scope.tablemov = false;
          $scope.tableMovDetails = false;
        }else{
          $scope.msjmov = false;
          $scope.tablemov = true;
          $scope.tableMovDetails = false;
          //$scope.datos.sales.splice(0,$scope.datos.sales.length);
          var newSale;
          var fecha;
          $scope.currentPage = page;
          ventas.forEach(function(sale){
            newSale = {};
            fecha = sale.createdAt;
            newSale.date = fecha.substring(0,10);//sale.createdAt.getDate()+"/"+ (sale.createdAt.getMonth()+1)+"/"+ sale.createdAt.getFullYear();
            newSale.reference = "<span style='cursor:pointer' onclick=verMovDetalle("+sale.id+")>"+sale.referencia+"</span>";
            newSale.phone = sale.phone;
            newSale.recharge = "EUR /. 5 - 10 USD ";
            newSale.total = "10,28 USD";//sale.realAmountUSD + sale.serviceFee,
            newSale.action = "<img style='cursor:pointer' src='images/icoEliminar.png' />";
            $scope.datos.sales.push(newSale);
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
