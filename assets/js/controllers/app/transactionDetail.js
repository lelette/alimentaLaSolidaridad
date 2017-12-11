'use strict';

/*******************************************************************************************
* @description :: define la interaccion necesaria para mostrar el detalle de un movimeinto *
* @autor :: Transamovil                                                                    *
*******************************************************************************************/

app.controller('movDetailsController',
  ['$rootScope', '$scope', '$http', '$state', '$stateParams', '$translate',
  function($rootScope,  $scope, $http, $state, $stateParams, $translate) {
    $rootScope.header = {}
    $rootScope.header.icono = "images/icoMovimientos.png";
    $rootScope.header.namePage = "Detalle de Movimiento";
    $scope.datos = { sales : [] };

    /**************************************************************************
    * consultar                                                               *
    * @descripcion :: consulta las transacciones realizadas en el sistema     *
    ***************************************************************************/
    $http.get('/plataform/sale/getTransactions?id='+$stateParams.id)
    .then(function(res){
      var venta = res.data.sales;
      if (venta.length == 0 || venta.length != 1) {
        $state.go('app.page.transactions');
      }else{
        $scope.tableMovDetails = true
        var newSale = {};
        var fecha = venta[0].createdAt;
        newSale.id = venta[0].id;
        newSale.date = fecha.substring(0,10);//sale.createdAt.getDate()+"/"+ (sale.createdAt.getMonth()+1)+"/"+ sale.createdAt.getFullYear();
        newSale.reference = venta[0].referencia;
        newSale.phone = venta[0].phone;
        newSale.status = venta[0].status;
        newSale.recharge = "EUR /. 5 - 10 USD ";
        newSale.total = "10,28 USD";//sale.realAmountUSD + sale.serviceFee,
        newSale.action = "<img src='images/icoEliminar.png' />";
        $scope.datos.sale = newSale;
     }

    }, function(res){
      console.log('res.data',res.data);
      $scope.msjmov = false;$scope.tablemov = true;
      $scope.$emit('$errorAjax',res.data);
    });


    $scope.goBack = function () {
      $state.go('app.page.transactions');
    }


}]);
