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
    activo: {
      defaultsTo: true,
      required:true,
      type:'boolean'
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
    Representante.findOne({ id: datos_crear.representante }, function (err, rep) {
      if (err) {
        console.log("ERROR REGISTRANDO EN LA BD :: ", err);
        return cb({ error: 'Error creando la ficha en la base de datos. Intente mas tarde.' });
      }

      if (!rep) return cb({ error: 'No existe el numero de ficha de representante que ingreso' });
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
    })

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
        console.log("RESULTADO :: ", resultado);
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
    Nino.update({ cedula: datos.nino.cedula }, datos.nino, function (err, ok) {
      if (err) {
        console.log(err);
        return cb({ error: "Error modificando en la base de datos." });
      }
      if (datos.historial_peso) {
        datos.historial_peso.nino = ok[0].id;
        var fecha_ingreso = {};
        fecha_ingreso.raw = new Date();
        fecha_ingreso.month = fecha_ingreso.raw.getMonth() + 1;
        fecha_ingreso.day = fecha_ingreso.raw.getDate();
        fecha_ingreso.year = fecha_ingreso.raw.getFullYear();
        datos.historial_peso.fecha_medicion = fecha_ingreso.day + "-" + fecha_ingreso.month + "-" + fecha_ingreso.year;
        Historial_peso.update({ nino: datos.historial_peso.id_nino, id: datos.historial_peso.id }, datos.historial_peso, function (err, upd) {
          if (err) {
            console.log("ERROR modificando el historial de peso del nino ".red, datos.id_nino);
            console.log(err);
          }
          if (upd.length == 0) {
            Historial_peso.create(datos.historial_peso, function (err, ne) {
              if (err) {
                console.log("ERROR creando el historial de peso del nino ".red, datos.id_nino);
                console.log(err);
              }
            })
          }
          return cb(undefined, { ok: "Ficha modificada exitosamente" });
        })
      } else {
        return cb(undefined, { ok: "Ficha modificada exitosamente" });
      }
    })
  },

  changeStatus: function(datos, cb){
    var act = {};
    act.representante = datos.representante;
    act.activo = datos.activo;
    Nino.update({representante: act.representante}, {activo: act.activo}, function(err, okKid){
      if (err) {
        console.log(err);
        return cb({ error: "Error modificando en la base de datos el estado de los ninos." });
      }

      return cb(undefined, { ok: "Ficha modificada exitosamente" });
    })
  }


};

