/**
 * Persona.js
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
    
    //################### DATOS PERSONALES #########################
    nombres: {
      type: 'string',
      required: true
    },

    apellidos: {
      type: 'string',
      required: true
    },

    fecha_nacimiento: {
      type: 'string',
      required: true
    },

    cedula:{
      type: 'string'
    },

    //################### DATOS ESCOLARES #########################
    estudia:{
      type: 'boolean',
      required: true
    },

    colegio: {
      type: 'string'
    },

    grado: {
      type:'string'
    },

    direccion_colegio:{
      type: 'string'
    },

    //################### DATOS MEDICOS #########################
    isEnfermo : {
      type: 'boolean',
      required: true
    },

    enfermedad: {
      type: 'string'
    },

    alergia: {
      type: 'string'
    },

    medicamentos: {
      type: 'string'
    }

  }
};

