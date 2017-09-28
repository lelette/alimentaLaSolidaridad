'use strict';

/*
*   Service :: User
*   descripción :: concentra todas as operaciones asociadas
*                  a un usuario
*/

app.service('User', [
  '$http',
  function ($http) {

    // Información por defecto del usuario
    this.info = {};

    /*******************************************************
    * refresh                                              *
    *    @descripcion :: refresca la informacion del user  *
    ********************************************************/
    this.refresh = function(cb){
      var aux = this.info;
      $http.get('plataform/user/getProfile')
      .then(function(res){
        aux.nombres= res.data.datos_basicos.nombres;
        aux.apellidos= res.data.datos_basicos.apellidos;
        aux.fecha_nacimiento= res.data.datos_basicos.fecha_nacimiento;
        aux.sexo= res.data.datos_basicos.sexo;
        aux.id= res.data.id;
        aux.emails= res.data.emails;
        aux.login= undefined;

        res.data.emails.forEach(function(email){
          if (email.enableLogin) {
            aux.login = email;
          };
        });

        return cb(undefined, true);
      }, function(res){
        return cb('Error Server');
      });
    };

    /*******************************************************
    * logout                                               *
    *   @descripcion :: termina la sesion autenticada      *
    ********************************************************/
    this.logout = function(cb){
      $http.post('plataform/user/logout',{})
      .then(function(res){
        cb(undefined, true);
      }, function(res){
        cb('Error Server');
      });
    };

    /*******************************************************
    * changePwd                                            *
    *   @descripcion :: cambia el password del usuario     *
    ********************************************************/
    this.changePwd = function(datos, cb){
      $http.post('plataform/user/changePassword',datos)
      .then(function(res){
        cb(undefined, true);
      }, function(res){
        cb('Error Server');
      });
    };

    /*******************************************************
    * addEmail                                             *
    *   @descripcion :: asocia un nuevo email al user      *
    ********************************************************/
    this.addEmail = function(datos, cb){
      $http.post('plataform/user/addEmail',datos)
      .then(function(res){
        cb(undefined, res.data);
      }, function(res){
        cb('Error Server');
      });
    };

    /*******************************************************
    * validateEmail                                        *
    *   @descripcion :: inicia validacion del email        *
    ********************************************************/
    this.validateEmail = function(datos, cb){
      var entrada = {
        id_target: datos.rel,
        data_target: "email",
      };

      $http.post('plataform/validation/generate',entrada)
      .then(function(res){
        cb(undefined, true);
      }, function(res){
        cb('Error Server');
      });
    };

    /*******************************************************
    * update                                               *
    *   @descripcion :: actualiza la informacion del       *
    *                   usuario                            *
    ********************************************************/
    this.update = function(datos, cb) {
      var aux = this;
      $http.post('plataform/user/updateProfile', datos)
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



}]);
