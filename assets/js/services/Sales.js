'use strict';

/*
*   Service :: User
*   descripción :: concentra todas as operaciones asociadas
*                  a un usuario
*/

app.service('Sales', [
  '$http',
  function ($http) {

    // Información por defecto del usuario
    this.info = {
      resumenSales: []
    };

    /**************************************************************************
    * consultar                                                               *
    * @descripcion :: consulta las transacciones realizadas en el sistema     *
    ***************************************************************************/
    this.refreshResumenSales = function(cb){
      var aux = this.info;
      $http.get('plataform/sale/getTransactions?')
      .then(function(res){
        aux.resumenSales.splice(0,aux.resumenSales.length);
        res.data.sales.forEach(function(sale){
          // detectamos el email principal
          sale.formatFecha = formatFecha(sale.createdAt);
          aux.resumenSales.push(sale);
        });
        return cb();
      }, function(res){
        console.log(res.data);
        return cb();
      });
    }

    /**************************************************************************
    * formatFecha                                                             *
    * @descripcion :: permite formatear una fecha                             *
    ***************************************************************************/
    function formatFecha(fecha){
      var date = new Date(fecha);
      var salida = {
        dia_mes_año_hora_minute : "",
      };

      var hora = ((date.getHours() < 10) ? '0' : '') + date.getHours();
      var min = ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes();
      var meridiam = ((date.getHours() > 12) ? 'pm' : 'am');
      var dia = ((date.getDay() < 10) ? '0' : '') + date.getDay();
      var mes = ((date.getMonth() < 10) ? '0' : '') + date.getMonth();
      var year = date.getFullYear();

      salida.corto = dia + '/' + mes + '/' + year + ' ' + hora + ':' + min + meridiam;
      return salida;
    }



}]);
