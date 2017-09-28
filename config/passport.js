/**
 * passport
 *
 * Default passport configuration and strategy
 * 
 * autor :: Aquilino Pinto apinto@transamovil.com
 */


var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy

// configuramos passport
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// configuramos passport
passport.deserializeUser(function(id, done) {
    User.findOne({ id: id } , function (err, user) {
        done(err, user);
    });
});

// agregamos strategy local a passport
passport.use(new LocalStrategy({
    usernameField: 'login',  
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, login, password, cb) {
      
    var datos = {
      phone: undefined,
      email: undefined,
      password: password
    };

    var datosReq = {
      ssid: req.session.id,
      locale: req.getLocale()
    }

    if (Utilities.format.isCorrectEmail(login))
      datos.email = login;
    else if (Utilities.format.isCorrectPhone(login)) 
      datos.phone = login;
    else
      return cb(Errores.generar(datosReq, {
          codigo:10101, 
          msjUser: sails.__({ phrase: "access.err.login.nocoinciden", locale: datosReq.locale}),
          msjDev: sails.__({ phrase: "access.err.login.nocoinciden", locale: datosReq.locale}),
        }));

    async.parallel({
      buscarPhoneRel: function(callback){
        if (!datos.phone) 
          callback(undefined, undefined);
        else {
          var criteriaP = {
            phone: datos.phone
          };

          Phone.findOne(criteriaP, function(err, phone){
            if (err) {
              sails.log.error("%s, model, User >> consultando phone en base de datos", datosReq.ssid);
              callback(Errores.generar(datosReq, {codigo:10003}));
            }else{

              if (!phone) {
                sails.log.error("%s, model, User >> no existe el phone suministrado", datosReq.ssid);
                callback(Errores.generar(datosReq, {
                  codigo:10101, 
                  msjUser: sails.__("phone.err.phone.exists"),
                  msjDev: sails.__("phone.err.phone.exists"),
                }));
              }else{
                var criteriaPR = {
                  phone: phone.id,
                  enableLogin: true
                };

                PhoneRel.findOne(criteriaPR, function(err, phoneRel){
                  if (err) {
                    sails.log.error("%s, model, User >> consultando phoneRel en base de datos", datosReq.ssid);
                    callback(Errores.generar(datosReq, {codigo:10003}));
                  }else{
                    if (!phoneRel) {
                      sails.log.error("%s, model, User >> no existe el phone suministrado", datosReq.ssid);
                      callback(Errores.generar(datosReq, {
                        codigo:10101, 
                        msjUser: sails.__("phoneRel.err.phoneRel.disable"),
                        msjDev: sails.__("phoneRel.err.phoneRel.disable"),
                      }));
                    }else{
                      callback(undefined, phoneRel.toJSON());
                    };
                  };
                });
              };
            };
          });
        }
      },
      buscarEmailRel: function(callback){
        if (!datos.email) 
          callback(undefined, undefined);
        else {
          var criteriaE = {
            email: datos.email
          };

          Email.findOne(criteriaE, function(err, email){
            if (err) {
              sails.log.error("%s, model, User >> consultando email en base de datos", datosReq.ssid);
              callback(Errores.generar(datosReq, {codigo:10003}));
            }else{

              if (!email) {
                sails.log.error("%s, model, User >> no existe el email suministrado", datosReq.ssid);
                callback(Errores.generar(datosReq, {
                  codigo:10101, 
                  msjUser: sails.__({ phrase: "email.err.email.exists", locale: datosReq.locale}),
                  msjDev: sails.__({ phrase: "email.err.email.exists", locale: datosReq.locale}),
                }));
              }else{
                var criteriaER = {
                  email: email.id,
                  enableLogin: true
                };

                EmailRel.findOne(criteriaER, function(err, emailRel){
                  if (err) {
                    sails.log.error("%s, model, User >> consultando emailRel en base de datos", datosReq.ssid);
                    callback(Errores.generar(datosReq, {codigo:10003}));
                  }else{
                    if (!emailRel) {
                      sails.log.error("%s, model, User >> no existe el emailRel con el email suministrado", datosReq.ssid);
                      callback(Errores.generar(datosReq, {
                        codigo:10101, 
                        msjUser: sails.__("emailRel.err.emailRel.disable"),
                        msjDev: sails.__("emailRel.err.emailRel.disable"),
                      }));
                    }else{
                      callback(undefined, emailRel.toJSON());
                    };
                  };
                });
              };
            };
          });
        }
      }
    }, function(err, results){
      if (err) {
        return cb(err);
      };

      var id_user = undefined;

      if (results.buscarEmailRel) {
        id_user = results.buscarEmailRel.user;
      }else if(results.buscarPhoneRel){
        id_user = results.buscarPhoneRel.user;
      };

      User.findOne({id: id_user}).populate('privilegios').exec(function(err, user){
        if (err) {
          sails.log.error("%s, model, User >> consultando user en base de datos", datosReq.ssid);
          return cb(Errores.generar(datosReq, {codigo:10003}));
        };

        Utilities.hasheo.comparar(datos.password, user.password,  function(err, result){
          if (err) {
            return cb(err);
          };

          if (!result) {
            sails.log.debug("%s, model, User >> el dato de login y el password no coinciden", datosReq.ssid);
            return cb(Errores.generar(datosReq,{codigo:10103}));
          }else{
            return cb(undefined, user.toJSON());
          };
        });
      });
    });
   
  }
));