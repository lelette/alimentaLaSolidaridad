/**
 * Historial_peso.js
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

    nino: {
      model:'nino',
      required: true
    },

    peso: {
      type: 'string'
    },

    circunferencia_brazo :{
      type: 'string'
    },

    altura: {
      type: 'string'
    },

    diagnostico: {
      type: 'string'
    },

    circunferencia_cabeza: {
      type: 'string'
    },

    fecha_medicion:{
      type: 'string',
      required: true
    }
  },

  agregar: function(datos, cb){
    Historial_peso.create(datos, function(err, ok){
      if (err) return cb({error: 'Error agregando registros de historial de peso.'});
      return cb(undefined, {ok: 'Registro creado exitosamente'});
    })
  },

  eliminar: function(datos, cb){
    Historial_peso.destroy({id: datos.id}, function(err, ok){
      if (err) return cb({error: 'Error eliminando registro de historial de peso.'});
      return cb(undefined, {ok: 'Registro eliminado exitosamente'});
    })
  }
};

