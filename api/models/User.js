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

  crear: function(datos, cb){
    //validar que el username
    User.create(datos, function(err, user){
      if (err) return cb({error: 'Hubo un error creando el registro en la BD'});
      return cb(undefined, user);
    })
  },

  modificar: function(datos, cb){
    User.update({username: datos.username}, datos, function(err, user){
      if (err) return cb({error: 'Hubo un error creando el registro en la BD'});
      return cb(undefined, user);
    })
  }
};

