/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      unique: true,
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

    nombreApellido: {
      type: 'string',
      required: true
    },

    email: {
      unique: true,
      type: 'string'
    },

    isAdmin: {
      required: true,
      type: 'boolean',
      defaultsTo: false
    }
  },

  crear: function (datos, cb) {
    //validar que el username
    User.findOne({ username: datos.username }, function (err, exists) {
      if (err) return cb({error: 'Error accesando la base de datos.'});
      if (!exists) {
        User.create(datos, function (err, user) {
          if (err) return cb({ error: 'Hubo un error creando el registro en la BD' });
          return cb(undefined, user);
        })
      }else{
        return cb({error: 'El nombre de usuario ingresado ya existe.'})
      }
    })

  },

  modificar: function (datos, cb) {
    User.update({ username: datos.username }, datos, function (err, user) {
      if (err) return cb({ error: 'Hubo un error creando el registro en la BD' });
      return cb(undefined, user);
    })
  },

  login: function (datos, cb){
    User.findOne(datos, function(err, ok){
      if (!ok){
        console.log('El usuario no se encuentra registrado'.red);
        return cb({error: 'El usuario no se encuentra registrado'});
      }else{
        return cb(undefined, ok);
      }
    })
  },

  consultarTodos: function (cb) {
    User.find(function (err, all) {
      if (err) {
        console.log(err);
        return cb({ error: 'Error creando la ficha del representante. Intente mas tarde' });
      }

      return cb(undefined, { usuarios: all });
    })
  },

  consultar: function (datos, cb) {
    var criterios = {};
    if (datos.username) criterios.username = datos.username;
    User.find(criterios)
      .exec(function (err, resultado) {
        if (err) return cb({ error: "ERROR CONSULTANDO CON FILTROS" });
        if (!resultado) return cb(undefined, { resultado: "No se encontraron resultados para la busqueda." });
        //EN CONSULTAR, CALCULAR LA EDAD RESPECTO A LA FECHA
        return cb(undefined, { resultado: resultado });
      })
  },

  eliminar: function(datos, cb){
      if (!datos.username) return cb({ error: "Debe ingresar el username para eliminar un usuario" });
      User.destroy({ username: datos.username }, function (err, ok) {
        if (err) {console.log(err); return cb({ error: "Error eliminando de la base de datos." });}
        return cb(undefined, { ok: "Usuario eliminado exitosamente" });
      })
  
  }

};

