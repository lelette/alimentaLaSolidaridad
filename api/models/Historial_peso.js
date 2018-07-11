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

    persona: {
      model:'persona',
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

    circunferencia_cabeza: {
      type: 'string'
    },

    fecha_medicion:{
      type: 'string',
      required: true
    }
  }
};

