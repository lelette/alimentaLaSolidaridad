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
      if (err) {
        console.log(err);
        return cb({error: 'Error accesando la base de datos.'});
      }
      if (!exists) {
        User.create(datos, function (err, user) {
          if (err) {
            return cb({ error: 'El email ingresado ya existe' });
          }
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
        return cb({error: 'Incorrecto nombre de usuario y/o contraseña'});
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
  },

  cambiarpassword: function(datos, cb){
    if (!datos.username) return cb({ error: "Debe ingresar el username para eliminar un usuario" });
    User.update({username: datos.username}, {password: datos.password}, function(err, ok){
      if (err) {console.log(err); return cb({ error: "Error actualizando usuario en la base de datos." });}
      return cb(undefined, { ok: "Contraseña actualizada exitosamente" });
    })
  },

  estadisticas: function(cb){
    async.parallel({
      ninas: function(callback){
        femenino(function(girls){
          return callback(undefined, girls);
        })
      },
      ninos: function(callback){
        masculino(function(boys){
          return callback(undefined, boys);
        })
      }
    }, function(err, todos){
      return cb(undefined, todos);
    })
  }

};

function femenino(callback){
  Nino.find({sexo:'F'}, function(err, ninas){
    var girls= {};
    girls.cero_cinco = 0;
    girls.seis_diez = 0;
    girls.once_quince = 0;
    girls.mayorQuince = 0;
    ninas.forEach(function(nina){
      nina.edad = getAge(nina.fecha_nacimiento);
      if (nina.edad >=0 && nina.edad <6){
        girls.cero_cinco = girls.cero_cinco + 1;
      }else{
        if (nina.edad>=6 && nina.edad<11){
          girls.seis_diez = girls.seis_diez +1;
        }else{
          if(nina.edad>=11 && nina.edad<16){
            girls.once_quince= girls.once_quince +1;
          }else{
            girls.mayorQuince = girls.mayorQuince +1;
          }
        }
      }
    });
    girls.cantidad = girls.cero_cinco + girls.seis_diez + girls.once_quince + girls.mayorQuince;
    return callback(girls);
  })
}

function masculino(callback){
  Nino.find({sexo:'M'}, function(err, ninas){
    var boys= {};
    boys.cero_cinco = 0;
    boys.seis_diez = 0;
    boys.once_quince = 0;
    boys.mayorQuince = 0;
    ninas.forEach(function(nino){
      nino.edad = getAge(nino.fecha_nacimiento);
      if (nino.edad >=0 && nino.edad <6){
        boys.cero_cinco = boys.cero_cinco + 1;
      }else{
        if (nino.edad>=6 && nino.edad<11){
          boys.seis_diez = boys.seis_diez +1;
        }else{
          if(nino.edad>=11 && nino.edad<16){
            boys.once_quince= boys.once_quince +1;
          }else{
            boys.mayorQuince = boys.mayorQuince +1;
          }
        }
      }
    });
    boys.cantidad = boys.cero_cinco + boys.seis_diez + boys.once_quince + boys.mayorQuince;
    return callback(boys);
  })
}

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}