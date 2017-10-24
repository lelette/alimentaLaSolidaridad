'use strict';

/*
*		@service :: Password
*		@descripción :: Service que permitira manejar de forma centralizada
*									 las acciones sobre contraseñas.
*/

app.service('validarPassword',
  [ '$translate' ,
  function($translate) {

  var dataCruda = [
    {valor: 'remove', color:'text-danger', nombre: 'El campo es requerido.', key:'empty'},
    {valor: 'remove', color:'text-danger', nombre: 'Debe ser mayor o igual a 8 caracteres.', key:'minLength'},
    {valor: 'remove', color:'text-danger', nombre: 'Debe tener por lo menos una letra en mayúscula.',key:'mayusChar'},
    {valor: 'remove', color:'text-danger', nombre: 'Debe tener por lo menos una letra en minúscula.',key:'minusChar'},
    {valor: 'remove', color:'text-danger', nombre: 'Debe tener al menos un carácter numérico.',key:'number'},
    {valor: 'remove', color:'text-danger', nombre: 'Debe tener al menos un carácter especial (Ej: $@#.,)',key:'especialChar'},
    {valor: 'remove', color:'text-danger', nombre: 'Debe solo contener letras, números y caracteres especiales',key:'validChar'}
  ];

  this.criterios = dataCruda;

  this.imprimirContenidoPopover = function(criterios, cb) {
    // internacionalizacion
    $translate([
      'signup.popover.password.empty',
      'signup.popover.password.minLength',
      'signup.popover.password.mayusChar',
      'signup.popover.password.minusChar',
      'signup.popover.password.number',
      'signup.popover.password.especialChar',
      'signup.popover.password.validChar'
    ]).then(function(traduccion){
      var keys = Object.keys(traduccion);
      keys.forEach(function(key, index){
        dataCruda[index].nombre = traduccion[key];
      });

      var contenido = '<div class="helper-pwd">';
      for (var i = 0; i < criterios.length; i++) {
        contenido = contenido+'<i class=" glyphicon glyphicon-'+criterios[i].valor+' '+criterios[i].color+'"></i>'+criterios[i].nombre+'<br>';
      }

      contenido = contenido + "</div>";

      return cb(contenido);
    })
  };

  this.inicializarData = function() {

    for (var i = 0; i < dataCruda.length; i++) {
      dataCruda[i].valor = "remove";
      dataCruda[i].color = "text-danger";
    }

    return dataCruda;
  }

}]);
