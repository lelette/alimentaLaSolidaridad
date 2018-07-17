'use strict';

/*
*   Service :: User
*   descripción :: concentra todas as operaciones asociadas
*                  a un usuario
*/

app.service('Nino', [
  '$rootScope',
  '$http',
  function ($rootScope,$http) {
    this.delete = function(datos, cb) {
        var aux = this;
        $http.post('api/nino/delete', datos)
        .then(function(res){
          aux.refresh(function(err){
            if (err) {
              cb(err);
            }else{
              cb(undefined, true);
            };
          });
        },function(res){
          cb('Error Server');
        });
      };
  
  }])