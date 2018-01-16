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
    $http.get('plataform/sale/getTransactions?id='+$stateParams.id)
    .then(function(res){
      var venta = res.data.sales;
      if (venta.length == 0 || venta.length != 1) {
        $state.go('app.page.transactions');
      }else{
        var  status;
        switch (venta[0].status) {
          case 'A': status = "Anulada";
          break;
          case 'R': status = "Rechazada";
          break;
          case 'P': status = "Pediente";
          break;
          case 'PC': status = "Por Cobrar";
          break;
          case 'C': status = "Completada";
          break;
          default: status = "A";
        }

        $scope.tableMovDetails = true
        var newSale = {};
        var fecha = venta[0].createdAt;
        newSale.id = venta[0].id;
        newSale.date = fecha.substring(0,10);//sale.createdAt.getDate()+"/"+ (sale.createdAt.getMonth()+1)+"/"+ sale.createdAt.getFullYear();
        newSale.reference = venta[0].referencia;
        newSale.phone = venta[0].phone;
        newSale.status = status;
        newSale.recharge = parseFloat(venta[0].expectedAmount);
        newSale.total = parseFloat(venta[0].realAmount) + parseFloat(venta[0].serviceFee);//sale.realAmountUSD + sale.serviceFee,
        newSale.action = "<img src='images/icoEliminar.png' />";
        $scope.datos.sale = newSale;
     }

    }, function(res){
      $scope.msjmov = false;$scope.tablemov = true;
      $scope.$emit('$errorAjax',res.data);
    });


    $scope.goBack = function () {
      $state.go('app.page.transactions');
    }


}]);
