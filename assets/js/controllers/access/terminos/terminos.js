'use strict';

/***********************************************************************************
*   controllador :: TerminosyCondicionesController                                 *
*   descripción :: controlador para la vista de terminos y condiciones.            *
************************************************************************************/

app.controller('TerminosyCondicionesController', [
  '$rootScope',
  '$scope',
  '$http',
  '$state',
  function($rootScope, $scope, $http, $state) {
    $scope.loading = false;
  //  $scope.ruta = $rootScope.apiUrl+'descargaDocumento/TC_TransaMovil.pdf';

    // Funcion para enviar el correo con los terminos y condiciones
    // $scope.enviar = function() {
    //   // mostramos el loader
    //   $scope.loading = true;
    //
    //   // solicitamos al servidor el envio del correo
    //   $http.get('usuario/enviarTerminosyCondiciones')
    //   .then(function(response) {
    //     // Reseteamos tiempo de sesión en cliente
    //     $scope.$emit('$resetAjax');
    //
    //     // Procesamos respuesta
    //     $scope.loading = false;
    //     toaster.pop('success','Correo','Se ha enviado el correo de forma exitosa');
    //   },function(res) {
    //     // Reseteamos tiempo de sesión en cliente
    //     $scope.$emit('$resetAjax');
    //
    //     // Procesamos respuesta
    //     $scope.loading = false;
    //     $scope.$emit('$errorAjax', res.data);
    //   });
    // };
}]);
