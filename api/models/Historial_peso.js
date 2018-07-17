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
    var fecha_ingreso= {}
    fecha_ingreso.raw = new Date();
    fecha_ingreso.month = fecha_ingreso.raw.getMonth() + 1;
    fecha_ingreso.day = fecha_ingreso.raw.getDate();
    fecha_ingreso.year = fecha_ingreso.raw.getFullYear();
    datos.fecha_medicion = fecha_ingreso.day + "-" + fecha_ingreso.month + "-" + fecha_ingreso.year;
    Nino.findOne( {cedula: datos.cedula}, function(err, nino){
      if (err) {
        console.log(err);
        return cb({error: 'Error buscando el nino antes de crear el historial'});
      }

      if (nino){
        datos.nino = nino.id;
        Historial_peso.create(datos, function(err, ok){
          if (err) {
            console.log(err);
            return cb({error: 'Error agregando registros de historial de peso.'});}
          return cb(undefined, {ok: 'Registro creado exitosamente'});
        })
      }
    })
    
  },

  eliminar: function(datos, cb){
    Historial_peso.destroy({id: datos.id}, function(err, ok){
      if (err) return cb({error: 'Error eliminando registro de historial de peso.'});

      console.log(ok);
      return cb(undefined, {ok: 'Registro eliminado exitosamente'});
    })
  }
};

