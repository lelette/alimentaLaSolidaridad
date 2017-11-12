'use strict';

/****************************************************************************************
* @description :: define toda la interaccion de las vistas relacionadas al perfil       *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('LandingHomeCtrl',
  ['$rootScope', '$scope', '$http', '$state', '$translate', '$uibModal',
  function($rootScope,  $scope, $http, $state, $translate, $uibModal) {

    $scope.consulta = {}

    // Mensajes de error
    $scope.msjErrors = {
     required: 'El campo es obligatorio',
     numero: 'Sólo números',
     email: 'Correo no válido',
     stringExt: 'Caracteres no válidos',
     fechaNac: 'Fecha no válida',
     minlength: 'Faltan números',
     maxlength: 'Excede el máximo de caracteres',
     stringStd: 'Acepta solo letras'
    };

}]);
