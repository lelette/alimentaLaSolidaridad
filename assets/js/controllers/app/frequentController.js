'use strict';

/****************************************************************************************
* @description :: define la interaccion necesaria para la gestion de numeros frecuentes *
* @autor :: Miguel Mendoza mmendoza@transamovil.com                                       *
*****************************************************************************************/

app.controller('FrequentController',
  [
    '$rootScope',
    '$scope',
    '$http',
    '$state',
    '$translate',
    '$uibModal',
  function($rootScope,  $scope, $http, $state, $translate, $uibModal) {

    // Variables fijas del Header
    $rootScope.header = {}
    $rootScope.header.icono = "images/icoNumFrec.png";
    $rootScope.header.namePage = "Números frecuentes";


    $scope.recarga = false;
    $scope.procesarRegarga = {};
    $scope.frecuentes = [];
    $scope.newFrequent = {
      alias: '',
      numero: ''
    };
    $scope.auxNumero = '';
    $scope.showCountry = false;

    $http.get('plataform/countries').then(function(response) {
      $scope.countries = response.data.paises;
      $scope.$emit('$resetAjax');
    }, function(res) {
      $scope.$emit('$resetAjax');
      $scope.$emit('$errorAjax',res.data);
    });

    $scope.countrySelected = function (country) {
      $scope.showCountry = true;
      $scope.pais = {
        url: 'images/banderas/'+country.name+'.png',
        ext: '+'+country.phone_code
      };
    };


    $scope.consultarFrecuentes = function () {
      $http.get('plataform/user/searchFrecuente')
      .then(function (response) {
        console.log('Frecuentes',response.data);
        $scope.frecuentes = response.data;
      }, function (x) {
        console.log(x.data);
      })
    };

    $scope.agregarRecarga = function (datos) {
      $scope.recarga = true;
    };

    $scope.agregarFrecuentes = function () {
      $scope.newFrequent.numero = $scope.pais.ext + $scope.auxNumero;

      var modalInstance = $uibModal.open({
        templateUrl: 'templates/modals/modalAddFrequent.html',
        controller: 'modalAddCtrl',
        backdrop: 'static',
        resolve: {
          dataScope:function() {
            return {
              frecuente: {
                numero: $scope.newFrequent.numero
              }
            }
          }
        }
      });

      modalInstance.result
      .then(function (result) {
        $scope.newFrequent.alias = result;
        $http.post('plataform/user/addFrecuente', $scope.newFrequent)
        .then(function (response) {

          $scope.auxNumero = '';
          $scope.showCountry = false;
          $scope.pais = {
            url: '',
            ext: ''
          };
          $scope.form.phone.$dirty = false;
          $scope.form.phone.$pristine = false;
          $scope.consultarFrecuentes();
        }, function (x) {
          console.log(x.data);
        });
      }, function () {

      });
    };

    $scope.eliminarFrecuente = function (frecuente) {
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


app.controller('modalAddCtrl',[
	'$scope',
  '$state',
	'$modalInstance',
	'$uibModal',
	'dataScope',
	'$http',
	function($scope, $state, $modalInstance, $uibModal, dataScope, $http) {
		$scope.datos = dataScope.frecuente;

		$scope.confirmar = function() {
      $modalInstance.close($scope.datos.alias);
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
  }
]);
