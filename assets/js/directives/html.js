// ################### Directiva API URL ####################

app.directive('apiUrl', ['$rootScope', function($rootScope) {
  return {
    link: function(scope, elm, attrs, ctrl) {
      $rootScope.apiUrl = attrs.value;
    }
  };
}])

app.directive('subHeader', ['$rootScope', function($rootScope) {
  return {
    link: function(scope, elm, attrs, ctrl) {
      $rootScope.subHeader = attrs.value;
    }
  };
}])


// mudar de locacion a la carpeta de directivas

// ##################### Directiva Numero #############################

// directiva que evalua si un string es un numero valido


app.directive('insertHtml', function() {
  return {
    link: function(scope, elm, attrs, ctrl) {

      var sepPunto = attrs.insertHtml.split('\.');

      // console.log(sepPunto);
      var html = scope;

      // reconstruimos el scope
      sepPunto.forEach(function(campo){
        if (html[campo]) {
          html = html[campo];
        };
      });

      elm.append(html);
    }
  };
})

// ################ Fin de direcriva Numero #########################

// ################# Directiva insertRecaptcha ######################

// directiva que expone una funcion en el $scope para consultar el
// valor actual de recaptcha de google

app.directive('insertRecaptcha', function() {
  return {
    link: function(scope, elm, attrs, ctrl) {
      // definimos una funcion para recoger el valor del recaptcha
      function recogerValor(){
        var valor = elm.find('#g-recaptcha-response').val();

        if (valor) {
          return valor;
        };

        return undefined;
      };

      scope.$getValRecaptcha = recogerValor;
    }
  };
})

// ############### Fin de Directiva insertRecaptcha #################

// ################# Directiva insertRecaptcha ######################

// directiva que expone una funcion en el $scope para consultar el
// valor actual de recaptcha de google

app.directive('clearErrorAjax', function(){
  return function($scope, $element){
    scope.$on('$destroy',function(){
        $element.unbind('$errorAjax');
    });
  };
})

// ############### Fin de Directiva insertRecaptcha #################


app.directive('fileButton', function() {
  return {
    link: function(scope, element, attributes) {

      var el = angular.element(element)
      var button = el.children()[0]
      console.log();
      el.css({
        position: 'relative',
        overflow: 'hidden',
        // width: auto,
        // height: auto
      })

      var fileInput = angular.element('<input id="fileInput" type="file" onClick="prueba()"/>')
      fileInput.css({
        position: 'absolute',
        top: 0,
        left: 0,
        'z-index': '2',
        width: '100%',
        height: '100%',
        // opacity: '0',
        cursor: 'pointer'
      })

      el.append(fileInput)


    }
  }
})
