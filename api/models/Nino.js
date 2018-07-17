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
      type: 'string',
      required: true
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

    cedula: {
      type: 'string'
    },

    //################### DATOS ESCOLARES #########################
    estudia: {
      type: 'boolean',
      required: true
    },

    colegio: {
      type: 'string'
    },

    grado: {
      type: 'string'
    },

    direccion_colegio: {
      type: 'string'
    },

    //################### DATOS MEDICOS #########################
    isEnfermo: {
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
    },

    fecha_ingreso: {
      type: 'string'
    },

    representante: {
      model: 'representante'
    },

    historial_peso: {
      collection: 'historial_peso',
      via: 'nino'
    }

  },

  crearFicha: function (datos, cb) {
    var datos_crear = datos.nino;
    var fecha_ingreso = {};
    var datos_historial = datos.historial_peso;
    fecha_ingreso.raw = new Date();
    fecha_ingreso.month = fecha_ingreso.raw.getMonth() + 1;
    fecha_ingreso.day = fecha_ingreso.raw.getDate();
    fecha_ingreso.year = fecha_ingreso.raw.getFullYear();
    datos_crear.fecha_ingreso = fecha_ingreso.day + "-" + fecha_ingreso.month + "-" + fecha_ingreso.year;

    Nino.create(datos_crear, function (err, newFicha) {
      if (err) {
        console.log("ERROR REGISTRANDO EN LA BD :: ", err);
        return cb({ error: 'Error creando la ficha en la base de datos. Intente mas tarde.' });
      }
      if (datos.historial_peso) {
        datos_historial.fecha_medicion = datos_crear.fecha_ingreso;
        datos_historial.nino = newFicha.id;
        Historial_peso.create(datos_historial, function (err, ok) {
          if (err) console.log("ERROR CREANDO EL HISTORIAL DE PESO:: ", err);
          console.log("Ficha ", newFicha.id, " de ", newFicha.nombres, " ", newFicha.apellidos, "creada exitosamente. ");
          return cb(undefined, { newFicha: newFicha })
        })
      } else {
        console.log("Ficha ", newFicha.id, " de ", newFicha.nombres, " ", newFicha.apellidos, "creada exitosamente. ");
        return cb(undefined, { newFicha: newFicha });
      }
    });
  },

  consultarTodos: function (cb) {
    Nino.find().exec(function (err, todos) {
      if (err) {
        console.log("ERROR CONSULTANDO LA BASE DE DATOS :: ", err);
        return cb({ error: "Error consultando todos los ninos en la base de datos." });
      }
      return cb(undefined, { ninos: todos });
    })
  },

  consultar: function (datos, cb) {
    var criterios = {};
    if (datos.nombres) criterios.nombres = datos.nombres;
    if (datos.apellidos) criterios.apellidos = datos.apellidos;
    if (datos.cedula) criterios.cedula = datos.cedula;
    Nino.find(criterios)
      .populate('historial_peso')
      .exec(function (err, resultado) {
        if (err) return cb({ error: "ERROR CONSULTANDO CON FILTROS" });
        if (!resultado) return cb(undefined, { resultado: "No se encontraron resultados para la busqueda." });
        //EN CONSULTAR, CALCULAR LA EDAD RESPECTO A LA FECHA
        return cb(undefined, { resultado: resultado })
      })
  },

  eliminar: function (datos, cb) {
    if (!datos.cedula) return cb({ error: "Debe ingresar la cedula para eliminar una ficha" });
    Nino.destroy({ cedula: datos.cedula }, function (err, ok) {
      if (err) return cb({ error: "Error eliminando de la base de datos." });
      return cb(undefined, { ok: "Ficha eliminada exitosamente" });
    })
  },

  modificar: function (datos, cb) {
    Nino.update({ cedula: datos.cedula }, datos, function (err, ok) {
      if (err) return cb({ error: "Error modificando en la base de datos." });
      if (datos.historial_peso) {
        datos.nino = ok.id;
        Historial_peso.findOrCreate({nino: datos.nino}, datos.historial_peso, function(err,ok){
          if (err) console.log("ERROR modificando el historial de peso del nino ", datos.nino);
          return cb(undefined, { ok: "Ficha modificada exitosamente" });
        })
      }else{
        return cb(undefined, { ok: "Ficha modificada exitosamente" });
      }
    })
  }


};

