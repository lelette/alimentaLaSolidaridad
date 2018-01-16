'use strict';

/****************************************************************************************
* @description :: define la interaccion necesaria para realizar el registro de usuarios *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/
 function verMovDetalle(id) {
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
            var  status;
            switch (sale.status) {
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
            newSale = {};
            fecha = sale.createdAt;
            newSale.date = fecha.substring(0,10);//sale.createdAt.getDate()+"/"+ (sale.createdAt.getMonth()+1)+"/"+ sale.createdAt.getFullYear();
            newSale.reference = "<span style='cursor:pointer' onclick=verMovDetalle("+sale.id+")>"+sale.referencia+"</span>";
            newSale.phone = sale.phone;
            newSale.status = status;
            newSale.recharge = sale.localCurrency +" /. "+ sale.expectedAmount +" - "+ sale.realAmount +" USD ";
            newSale.total = parseFloat(sale.realAmount) + parseFloat(sale.serviceFee);
            $scope.datos.sales.push(newSale);
          });

        };
      }, function(res){
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
