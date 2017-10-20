'use strict';

/****************************************************************************************
* @description :: define la interaccion necesaria para la gestion de numeros frecuentes *
* @autor :: Miguel Mendoza mmendoza@transamovil.com                                       *
*****************************************************************************************/

app.controller('FrequentController',
  ['$rootScope', '$scope', '$http', '$state', '$translate', '$uibModal',
  function($rootScope,  $scope, $http, $state, $translate, $uibModal) {

    $scope.frecuentes = [];
    $scope.newFrequent = {
      alias: '',
      numero: ''
    };
    $scope.auxNumero = '';

    var primeAppVar = {}
    primeAppVar.optionsNeeruSelectBox = $('.options-neeru-select-box');
    primeAppVar.selectNeeruOpen = $('.option-neeru');
    primeAppVar.window = $(window);
    $scope.showCountry = false;

    $http.get('plataform/countries').then(function(response) {
      $scope.countries = response.data.paises;
      $scope.$emit('$resetAjax');
    }, function(res) {
      $scope.$emit('$resetAjax');
      $scope.$emit('$errorAjax',res.data);
    });

    $scope.countrySelected = function (country) {
      primeAppVar.optionsNeeruSelectBox.css('display','none');
      primeAppVar.selectNeeruOpen.css('display','none');
      $scope.showCountry = true;
      $scope.pais = {
        url: 'images/banderas/'+country.name+'.png',
        ext: '+'+country.phone_code
      }
    }

    $scope.abrirSelectCountry = function () {
      console.log("primeAppVar.optionsNeeruSelectBox.css('display')", primeAppVar.optionsNeeruSelectBox.css('display'));
      if (primeAppVar.optionsNeeruSelectBox.css('display') == 'none') {
        primeAppVar.optionsNeeruSelectBox.css('display','block');
        primeAppVar.selectNeeruOpen.css('display','block');
      }
    }

    $scope.closeOptionBox = function(){
      primeAppVar.optionsNeeruSelectBox.removeAttr('style')
      primeAppVar.selectNeeruOpen = false;
    }


    $scope.consultarFrecuentes = function () {
      $http.get('plataform/user/searchFrecuente')
      .then(function (response) {
        console.log('Frecuentes',response.data);
        $scope.frecuentes = response.data;
      }, function (x) {
        console.log(x.data);
      })
    };



    $scope.agregarFrecuentes = function () {
      $scope.newFrequent.numero = $scope.pais.ext + $scope.auxNumero;
      console.log($scope.newFrequent.numero);
      $http.post('plataform/user/addFrecuente', $scope.newFrequent)
      .then(function (response) {
        console.log('New Frequent', response.data);
        $scope.consultarFrecuentes();
      },function (x) {
        console.log(x.data);
      })
    };

    $scope.eliminarFrecuente = function (frecuente) {
      console.log(frecuente);
      $http.post('plataform/user/removeFrecuente', {numero: frecuente})
      .then(function (response) {
        console.log(response.data);
        $scope.consultarFrecuentes();
      }, function (x) {
        console.log(x.data);
      })
    };

    $scope.modificarFrecuente = function (frecuente) {
      var modalInstance = $uibModal.open({
        templateUrl: 'templates/modals/modalUpdateFrequent.html',
        controller: 'modalUpdateCtrl',
        backdrop: 'static',
        resolve: {
          dataScope:function() {
            return {
              frecuente: {
                numero: frecuente.frecuente.numero,
                alias: frecuente.alias,
                numero_frecuente: frecuente.id
              }
            }
          }
        }
      });

      modalInstance.result
      .then(function (result) {
        console.log(result);
        $http.post('plataform/user/updateFrecuente', result)
        .then(function (response) {

          console.log(response.data);
          $scope.consultarFrecuentes();
        }, function (x) {
          console.log(x.data);
        });
      }, function () {

      });
    };

    // Consultamos los numeros frecuentes asociados a la sesion
    $scope.consultarFrecuentes();

}]);
app.controller('modalUpdateCtrl',[
	'$scope',
  '$state',
	'$modalInstance',
	'$uibModal',
	'dataScope',
	'$http',
	function($scope, $state, $modalInstance, $uibModal, dataScope, $http) {
		$scope.datos = dataScope.frecuente;

		$scope.confirmar = function() {
      $modalInstance.close($scope.datos);
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
  }
]);
