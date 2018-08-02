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
    sector: {
      type: 'string'
    },

    parroquia: {
      type: 'string'
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

    direccion_habitacion: {
      type: 'string'
    },

    telefono: {
      type: 'string'
    },

    profesion: {
      type: 'string'
    },

    sexo: {
      type: 'string',
      enum: ['F', 'M']
    },

    trabaja: {
      type: 'boolean',
      required: true
    },

    ocupacion: {
      type: 'string'
    },

    ingreso_mensual: {
      type: 'string'
    },

    estado_civil: {
      type: 'string',
      enum: ['soltero/a', 'casado/a', 'divorciado/a', 'viudo/a']
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

    modificacion_alim_seis_meses: {
      type: 'boolean'
    },

    modificacion_razon: {
      type: 'string'
    },

    ninos: {
      collection: 'nino',
      via: 'representante'
    }

  },

  crearFicha: function (datos, cb) {
    var crear = datos;
    var fecha_ingreso = {};
    fecha_ingreso.raw = new Date();
    fecha_ingreso.month = fecha_ingreso.raw.getMonth() + 1;
    fecha_ingreso.day = fecha_ingreso.raw.getDate();
    fecha_ingreso.year = fecha_ingreso.raw.getFullYear();
    crear.fecha_ingreso = fecha_ingreso.day + "-" + fecha_ingreso.month + "-" + fecha_ingreso.year;

    Representante.create(crear, function (err, nuevoRepresentante) {
      if (err) {
        console.log(err);
        return cb({ error: 'Error creando la ficha del representante. Intente mas tarde' });
      }

      console.log(nuevoRepresentante);
      return cb(undefined, { nuevoRepresentante: nuevoRepresentante });
    })
  },

  consultarTodas: function (cb) {
    Representante.find(function (err, all) {
      if (err) {
        console.log(err);
        return cb({ error: 'Error creando la ficha del representante. Intente mas tarde' });
      }

      console.log(all);
      return cb(undefined, { todas: all });
    })
  },


  consultar: function (datos, cb) {
    var criterios = {};
    if (datos.nombres) criterios.nombres = datos.nombres;
    if (datos.apellidos) criterios.apellidos = datos.apellidos;
    if (datos.cedula) criterios.cedula = datos.cedula;
    Representante.find(criterios)
      .populateAll()
      .exec(function (err, resultado) {
        if (err) return cb({ error: "ERROR CONSULTANDO CON FILTROS" });
        if (!resultado) return cb(undefined, { resultado: "No se encontraron resultados para la busqueda." });
        //EN CONSULTAR, CALCULAR LA EDAD RESPECTO A LA FECHA
        return cb(undefined, { resultado: resultado });
      })
  },

  eliminar: function (datos, cb) {
    if (!datos.cedula) return cb({ error: "Debe ingresar la cedula para eliminar una ficha" });
    Representante.findOne({ cedula: datos.cedula }, function (err, rep) {
      if (err) return cb({ error: "Error conectando a la base de datos." });
      if (!rep) return cb({ error: "No se encontro representante con esa cedula." });
      Nino.destroy({ representante: rep.id }, function (err, ninos) {
        if (err) return cb({ error: "Error borrando las fichas de los ninos de ese representante" });
        Representante.destroy({ cedula: datos.cedula }, function (err, ok) {
          if (err) return cb({ error: "Error eliminando de representante de la base de datos." });
          return cb(undefined, { ok: "Ficha eliminada exitosamente" });
        })
      })
    })
  },

  modificar: function (datos, cb) {
    Representante.update({ cedula: datos.cedula }, datos, function (err, ok) {
      if (err) return cb({ error: "Error modificando en la base de datos." });

      return cb(undefined, { ok: "Ficha modificada exitosamente" });
    })
  },

  changeStatus: function(datos, cb){
    Representante.update({ cedula: datos.cedula }, datos, function (err, ok) {
      if (err) return cb({ error: "Error modificando en la base de datos." });

      Nino.update({representante: ok.id}, datos, function(err, okKid){
        if (err) return cb({ error: "Error modificando en la base de datos el estado de los ninos." });

        return cb(undefined, { ok: "Ficha modificada exitosamente" });
      })
    })
  }


};

