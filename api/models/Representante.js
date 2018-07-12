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

      fecha_ingreso: {
        type:'string',
        required: true
    },

    sector:{
        type: 'string'
    },

    parroquia:{
        type:'string'
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

      direccion_habitacion:{
        type: 'string'
      },

      telefono:{
        type: 'string'
      },

      profesion:{
        type: 'string'
      },

      sexo:{
        type: 'string',
        enum: ['F', 'M']
      },

      trabaja:{
        type: 'boolean',
        required: true
      },
  
      ocupacion: {
        type: 'string'
      },
  
      ingreso_mensual: {
        type:'string'
      },
  
      estado_civil:{
        type: 'string',
        enum:['soltero/a', 'casado/a', 'divorciado/a', 'viudo/a']
      },
  
      emergencia_nombre: {
        type: 'string'
      },
  
      emergencia_telefono: {
        type: 'string'
      },
  
      emergencia_parentesco: {
        type: 'string'
      },

      numero_comidas_diarias: {
          type: 'integer'
      },

      modificacion_alim_seis_meses :{
          type: 'boolean'
      },

      modificacion_razon: {
          type: 'string'
      },

      ninos: {
        collection: 'nino',
        via: 'representante'
      }
  
    }
  };
  
  