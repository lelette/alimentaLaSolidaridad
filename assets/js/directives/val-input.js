

// ################# Directivas

// mudar de locacion a la carpeta de directivas

// ##################### Directiva Numero #############################

// directiva que evalua si un string es un numero valido

var INTEGER_REGEXP = /^\d*$/;

app.directive('numero', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.numero = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue) || INTEGER_REGEXP.test(viewValue)) {
          // si pasa el test es valido
          return true;
        }

        // si no pasa el test no es valido
        return false;
      };
    }
  };
});

// ################ Fin de direcriva Numero #########################

// ################### Directiva String estandar #####################

var STRING_STD_REGEXP = /^[a-zA-ZñáéíóúÁÉÍÓÚ ]*$/;

app.directive('stringStd', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      ctrl.$validators.stringStd = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue) || STRING_STD_REGEXP.test(viewValue)) {
          // si pasa el test es valido
          return true;
        }

        // si no pasa el test no es valido
        return false;
      };
    }
  };
});

// ############### Fin Directiva String estandar #####################

// ################### Directiva String estandar #####################

var STRING_EXT_REGEXP = /^[a-zA-Z0-9ñáéíóúÁÉÍÓÚ \,\.]*$/;

app.directive('stringExt', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      ctrl.$validators.stringExt = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue) || STRING_EXT_REGEXP.test(viewValue)) {
          // si pasa el test es valido
          return true;
        }

        // si no pasa el test no es valido
        return false;
      };
    }
  };
});

// ############### Fin Directiva String estandar #####################

// ################### Directiva Fecha Mayor ########################

app.directive('fechaMayor', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      ctrl.$validators.fechaMayor = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // si pasa el test es valido
          return true;
        }

        // se asume que el año viene en formato full osea, yyyy
        // se asume que el mes viene en formato numerico, mm
        var mes = undefined;
        var year = undefined;

        if (viewValue.length == 4) {
          // activo el campo year
          year = viewValue;
          mes = scope.mes;
        }else if(viewValue.length == 2 ){
          mes = viewValue;
          year = scope.year;
        };

        var fechaActual = new Date();

        if (!year || !mes) {
          if (!year) scope.year = "";
          else scope.mes = "";
          return true;
        };

        // asumimos que los meses inician desde el 01 hasta 11
        var mesI = parseInt(mes)-1;
        var yearI = parseInt(year);

        var fechaTarget = new Date();
        fechaTarget.setMonth(mesI);
        fechaTarget.setYear(yearI);

        if (fechaTarget >= fechaActual) {
          scope.mes = mes;
          scope.year = "" + (yearI);
          return true;
        };

        // si no pasa el test no es valido
        return false;
      };
    }
  };
});

// ############ Fin de directiva Fecha Mayor #########################

var FECHA_NAC_REGEXP = /(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[/\\/](19|20)\d{2}/;

app.directive('fechaNacSinDate', function($window) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      ctrl.$validators.fechaNacSinDate = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // si pasa el test es valido
          return true;
        }

        //detectando navegador
        var userAgent = $window.navigator.userAgent;

        function detectarNavegador(userAgent) {
          var browsers = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i};

          for(var key in browsers) {
             if (browsers[key].test(userAgent)) {
                 return key; // navegador actual
             }
          };
        }

        var navegador = detectarNavegador(userAgent);
        var separador;
        var fecha = viewValue;
        var fechaAux;
        var yearActual = new Date();
        var yearActual = yearActual.getFullYear();
        var year, mes, dia;

        if (navegador == 'firefox') {
          fechaAux = fecha.split("/");
          year = fechaAux[2];
          dia = fechaAux[1];
          mes = fechaAux[0];
          fecha = dia + '/' + mes + '/' + year;
        }else {
          fechaAux = fecha.split("-");
          year = fechaAux[0];
          mes = fechaAux[1];
          dia = fechaAux[2];
          fecha = dia + '/' + mes + '/' + year;
        }

        if (FECHA_NAC_REGEXP.test(fecha)) {
          if (angular.isDefined(fecha)) {
            // Garantizamos que la persona tiene mas de 16 años
            if ( (dia > 31) || (yearActual  - year) < 15 ) {
              console.log('No cumple con el requisito de edad');
              return false;
            }else {
              return true;
            }
          };
        }else { // Fin de FECHA_NAC_REGEXP.test(viewValue)
          return false;
        }
      }
    }
  };
});

// ################### Directiva Fecha Nacimiento ########################

app.directive('fechaNac', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      ctrl.$validators.fechaNac = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // si pasa el test es valido
          return true;
        }

        // se asume que la fecha viene en formato yyyy-mm-dd
        var year = undefined;
        var date = viewValue.split("-");
        var fechaActual = new Date();
        year = parseInt(date[0]);
        yearActual = fechaActual.getFullYear();

        // Fechas mayores al año actual son inválidas
        if (year >= yearActual || year < 1900) return false;
        else {
          var diff = yearActual - year;

          // Debe ser mayor de 16 años
          if (diff > 16) return true;
          else return false;
        }
      };
    }
  };
});

// ############ Fin de directiva Fecha Nacimiento #########################

// ################### Directiva Cedula Venezuela ####################

var CEDULA_VEN_REGEXP = /[0-9]/;

app.directive('cedulaVen', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      console.log(elm);
      ctrl.$validators.cedulaVen = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // si pasa el test es valido
          return true;
        }

        if (CEDULA_VEN_REGEXP.test(viewValue) && viewValue.length > 5 && viewValue.length < 9) {
          // si pasa el test es valido
          return true;
        }

        // si no pasa el test no es valido
        return false;
      };
    }
  };
});

// ################### Fin Directiva Cedula Venezuela ################

// ################### Directiva Monto Restrictivo ####################

app.directive('montoRestrict', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      ctrl.$validators['montoRestrict'+attrs['restrictService']] = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // si pasa el test es valido
          return true;
        }

        var restriccion = [];

        // esta info esta cableada, deberia provenir del servidor
        switch (attrs['restrictService']) {
          case ('Recarga_Digitel') :
            restriccion = {minimo: 100, maximo: 6000, multiplo: 100};
            break;
          case ('Recarga_Movistar') :
            restriccion = {minimo: 200, maximo: 4000, multiplo: 50};
            break;
          default:
            break;
        };

        if ( (restriccion.minimo && (viewValue < restriccion.minimo) )
              || (restriccion.maximo && (viewValue > restriccion.maximo) )
              || (restriccion.multiplo && (viewValue % restriccion.multiplo != 0) )
              ) {
          scope.msjErrors['montoRestrict'+attrs['restrictService']] = 'El monto debe ser mayor a '+ restriccion.minimo +' y menor a '+ restriccion.maximo + ', en múltiplos de ' + restriccion.multiplo;
          return false;
        }

        return true;
      };
    }
  };
});

// ################### Fin Directiva Monto Restrictivo ################

// ################### Directiva Ocultar Campo ####################

app.directive('ocultar', function() {
  return {
    require: 'ngModel',
    priority: 1,
    restrict: 'A',
    link: function(scope, elm, attrs, ctrl) {
      elm.bind('focus', function(){
        elm.attr('type','text');
      }).bind('blur', function(){
        if (!elm.hasClass('ng-invalid')) {
          elm.attr('type','password');
        };
      });
    }
  };
});

// ################### Fin Directiva Ocultar Campo ################


// ################### Directiva Password ####################

var PASSWORD_REGEXP = /^[0-9A-Za-z@ñÑ\.\,\_\$#\-]*$/;

app.directive('password', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      ctrl.$validators.password = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // si pasa el test es valido
          return true;
        }

        if (PASSWORD_REGEXP.test(viewValue)) {
          // si pasa el test es valido
          return true;
        }

        // si no pasa el test no es valido
        return false;
      };
    }
  };
});

// ################### Directiva Caracteres validos ####################

var PASSWORD_REGEXP = /^[0-9A-Za-z@ñÑ\.\,\_\$#\-]*$/;

app.directive('caracteresValidos', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      ctrl.$validators.caracteresValidos = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // si pasa el test es valido
          return true;
        }

        if (PASSWORD_REGEXPE.test(viewValue)) {
          // si pasa el test es valido
          return false;
        }

        // si no pasa el test no es valido
        return true;
      };
    }
  };
});

/*
*   directiva :: validarPassword
*   descripción :: realiza la validacion del password, teniendo en cuenta que las validaciones son
*                  de diferentes valores se devuelve el valor booleano que indica si el password
*                  es correcto. ademas se crea una variable llamada '$errorValidarPassword' que
*                  contendra el resultado de las validaciones realizadas.
*
*/

app.directive('validarPassword', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      ctrl.$validators.validarPassword = function(modelValue, viewValue) {

        // definimos en que variable del scope reportaremos los resultados.
        var result = attrs.validarPassword || '$errorValidarPassword';
        scope[result] = {};
        var correcto = true;

        // si pasa el test es valido
        scope[result].empty = !ctrl.$isEmpty(modelValue);
        correcto = !ctrl.$isEmpty(modelValue);

        if (!correcto) {
          scope[result].correcto = correcto;
          return false;
        }

        // debe tener al menos 8 caracteres
        scope[result].minLength = !(modelValue.length < 7);
        correcto = correcto && !modelValue.length < 7;

        // debe tener maximo 16 caracteres
        scope[result].maxlength = !(modelValue.length > 16);
        correcto = correcto && !modelValue.length > 16;

        // debe tener una mayuscula
        var mayus = /[A-ZÑ]/;
        scope[result].mayusChar = mayus.test(modelValue);
        correcto = correcto && mayus.test(modelValue);


        // debe tener almenos una minuscula
        var minus = /[a-zñ]/;
        scope[result].minusChar = minus.test(modelValue);
        correcto = minus.test(modelValue);

        // deb tener almenos un numero
        var number = /[0-9]/;
        scope[result].number = number.test(modelValue);
        correcto = correcto && number.test(modelValue);

        // debe tener un caracter especial
        var especial = /[@\.\,\_\$\#\-]/;

        scope[result].especialChar = especial.test(modelValue);
        correcto = correcto && especial.test(modelValue);

        // debe tener un caracter invalidos
        var validCharater = /[^a-zA-Z0-9ñÑ@\.\,\_\$\#\-]/;
        var resultValidChar = ! validCharater.test(modelValue) && scope[result].mayusChar && scope[result].minusChar && scope[result].number &&   scope[result].especialChar
        scope[result].validChar = resultValidChar;
        correcto = correcto && resultValidChar;

        scope[result].correcto = correcto;
        return correcto;
      };
    }
  };
});

// ################### Fin Directiva Password ################

// ##################### Directiva maxAmount #############################

// directiva que evalua si un string es un numero valido

var INTEGER_REGEXP = /^\d*$/;

app.directive('maxAmount', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.maxAmount = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue) || parseFloat(modelValue) <= parseFloat(attrs.maxAmount)) {
          // si pasa el test es valido
          return true;
        }

        // si no pasa el test no es valido
        return false;
      };
    }
  };
});

// ################ Fin de direcriva maxAmount #########################

// ##################### Directiva minAmount #############################

// directiva que evalua si un string es un numero valido

var INTEGER_REGEXP = /^\d*$/;

app.directive('minAmount', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.minAmount = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue) || parseFloat(modelValue) >= parseFloat(attrs.minAmount) ) {
          // si pasa el test es valido
          return true;
        }

        // si no pasa el test no es valido
        return false;
      };
    }
  };
});

// ################ Fin de direcriva minAmount #########################
// app.directive('validFile', function() {
//   console.log('Hola mundo');
//   return {
//     require: 'ngModel',
//     link: function(scope, el, attrs, ctrl) {
//       console.log(ctrl);
//       // var model = attrs.ctrl
//       // var modelSetter = model.assign;
//       var maxSize = 2*1024*1024; //2*1024*1024 B
//       ctrl.$validators.validFile = function (modelValue, viewValue) {
//         console.log(modelValue);
//         if (ctrl.$isEmpty(modelValue)) {
//           return true;
//         }
//
//         return false;
//         // if (el[0].files.length > 1) {
//         //     modelSetter(scope, el[0].files);
//         // } else {
//         //     modelSetter(scope, el[0].files[0]);
//         // }
//         // var fileSize = el[0].files[0].size;
//         // if (fileSize > maxSize) {
//         //     scope.ebook.maxSizeError = true;
//         // }
//       };
//     }
//   };
// });
