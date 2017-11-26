'use strict';

/*
*   Service :: User
*   descripción :: concentra todas as operaciones asociadas
*                  a un usuario
*/

app.service('Recharge', [
  '$http',
  function ($http) {

    // Información permanente de las recargas pendientes
    this.cart = {
      token: null,
      details: []
    };

    // Información temporal de la recarga a realizar
    this.info = {};

    /*******************************************************
    * reset                                                *
    *   @descripcion :: limpia el registro de  recarga     *
    ********************************************************/
    this.reset = function(){
      this.info = {};
    };

    /*******************************************************
    * getTasa                                              *
    *   @descripcion :: realiza una consulta de tasa de    *
    *                   cambio                             *
    ********************************************************/
    this.getTasa = function(amount, cb){
      var datos = {};

      if (amount instanceof Object) {
        datos.idProduct = amount.medio.cred_id;
        datos.receiveValue = amount.monto;
        this.info.medio = amount.medio;
      }else{
        datos.idProduct= this.info.oferta.medios[0].cred_id;
        datos.receiveValue=amount;
      };

      $http.post('plataform/sale/getTCUSD', datos)
      .then(function(res){
        console.log('estoy haciendo algo', res);
        return cb(undefined, res.data.result);
      }, function(res){
        return cb(res.data);
      });

    };

    /*******************************************************
    * apply                                                *
    *   @descripcion :: realiza la recarga                 *
    ********************************************************/
    this.apply = function(cb){
      var aux = this.info;
      this.info.expectedCurrency = this.info.oferta.pais.iso_currency;
      $http.post('plataform/sales/recharge', this.info)
      .then(function(res){
        aux.result = res.data;
        cb(undefined, res.data);
      }, function(res){
        cb(res.data);
      });

    };


}]);
