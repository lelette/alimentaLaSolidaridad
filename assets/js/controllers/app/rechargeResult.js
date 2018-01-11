'use strict';

/****************************************************************************************
* @description :: Informacion y funciones del homepage *
* @autor :: Marialette Argulles marguelles@transamovil.com                                       *
*****************************************************************************************/

app.controller('rechargeResultCtrl',
  ['$rootScope', '$scope', '$http', '$state', 'Recharge', '$translate', 'User', '$uibModal',
  function($rootScope, $scope, $http, $state, Recharge, $translate, User, $uibModal) {
    var result = [];

    if (typeof(Recharge.result) == "object" && Recharge.result.length < 1) {
      result.push(Recharge.result);
    }else {
      result = Recharge.result;
    }

    $scope.result = result;
    $scope.datos  = {
      tdcAfiliadas: 0,
      frecuentes: 0,
      recargas: 0
    };

    $scope.checkFrequent = false; // Variable para chequear el checkbox del frecuente
    $scope.pais = {}
    $scope.disabledNumberCountry = true;
    $scope.showCountry = false;
    $scope.array_frequent = [] // Guardo todos los seleccionados como frecuente para abrir modal

    /*********************************************************************
    * @description :: Actualiza el checkbox por cada numero seleccionado *
    * @autor :: Javier Stifano <jstifano@transamovil.com>                *
    **********************************************************************/

    $scope.updateSelectedFrecuent = function(checked, transaction){
      // Si el check es true, lo agrego al array
      if (checked) {
        $scope.array_frequent.push(transaction)
      }
      else { // Lo borro ya que no esta marcado
        for (var i = 0; i < $scope.array_frequent.length; i++)
          if($scope.array_frequent[i].phone == transaction.phone)
            $scope.array_frequent.splice(i, 1)
      }
    }

    /*************************************************************************************
    * @description :: Click del botón "Add frequent" para añadir los numeros frecuentes  *
    * @autor       :: Javier Stifano <jstifano@transamovil.com>                          *
    **************************************************************************************/

    $scope.handleFrequent = function(){
      var modalInstance = $uibModal.open({
        templateUrl: 'templates/modals/addFrequentResult.html',
        controller: 'AddFrequentModalCtrl',
        backdrop: 'static',
        resolve: {
          dataScope:function() {
            return {
              data: $scope.array_frequent
            }
          }
        }
      })
    }

}]);

app.controller('AddFrequentModalCtrl', [
  '$rootScope',
  '$scope',
  '$http',
  '$state',
  '$interval',
  'User',
  'dataScope',
  '$modalInstance',
  'Recharge',
  function($rootScope, $scope, $http, $state, $interval, User, dataScope, $modalInstance, Recharge) {

  $scope.frecuentes = dataScope.data
  $scope.alias = ""
  $scope.counter = 0
  $scope.showButtonNext = true


  /**************************************************************************
  * @description :: Abre la modal para agregar numeros frecuentes del array *
  * @autor :: Javier Stifano <jstifano@transamovil.com>                     *
  ***************************************************************************/

  $scope.confirmar = function(){
    var frecuente = {
      numero: $scope.frecuentes[$scope.counter].phone,
      alias: $scope.alias
    }

    $scope.counter += 1 // Contador de frecuentes

    /* Condicionales para validar switches de palabras en botones
     * "Aceptar", "Finalizar", "Siguiente" */

    // Para mostrar el title del boton de "Finalizar"
    if($scope.counter == $scope.frecuentes.length-1){
      $scope.showButtonNext = false // Muestro el button de finalizar
    }

    $http.post('plataform/user/addFrecuente', frecuente)
      .then(function(respuesta){
        $scope.frecuentes.splice($scope.counter-1, 1)
        $scope.counter-- // Resto el contador ya que borre
        $scope.alias = "" // Reseteo el alias del frecuente
        Recharge.setCheckFrequent()
      }, function(error){
        //console.log("ERROR >>>", error)
      })

    if($scope.counter == $scope.frecuentes.length){
      $scope.counter = 0 // Reseteo el contador de frecuentes
      $scope.frecuentes = []
      $modalInstance.dismiss('cancel')
    }
  }

  $scope.cancel = function(){
    $scope.frecuentes.length >= 1 ? $modalInstance.dismiss('cancel') : $scope.frecuentes = []
  }

}]);
