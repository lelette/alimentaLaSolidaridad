'use strict';

/****************************************************************************************
* @description :: define toda la interaccion de las vistas relacionadas al perfil       *
* @autor :: Aquilino Pinto apinto@transamovil.com                                       *
*****************************************************************************************/

app.controller('BasicController',
  ['$rootScope', '$scope', '$http', '$state', 'User', '$translate', '$uibModal',
  function($rootScope,  $scope, $http, $state, User, $translate, $uibModal) {

    $scope.user = {};

    $scope.sexos = [
      'F',
      'M'
    ];
    // Variables fijas del SUBHeader
    $rootScope.header = {}
    $rootScope.header.icono = "images/icoInicio.png";
    $rootScope.header.home = false;
    $rootScope.header.namePage = "Perfil";
    $scope.load = true;
    // refrescamos la data que tenemos del user
    $scope.loader='mostrar';
    $scope.cuerpo='ocultar';

  $scope.refreshUser = function () {
    User.refresh(function(err){
      if (err) {
        $scope.loader = 'ocultar';
        $scope.cuerpo = 'mostrar';
      }else{
        $scope.loader = 'ocultar';
        $scope.cuerpo = 'mostrar';
        $scope.user = {
          nombres : User.info.nombres,
          apellidos : User.info.apellidos,
          sexo: User.info.sexo,
          fecha_nacimiento: new Date(User.info.fecha_nacimiento),
          email: User.info.login.email.email,
          imagen_perfil: User.info.imagen_perfil,
        };
      }
    });
  };
  $scope.refreshUser();

  $scope.imageChange = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'templates/modals/modalChangeImage.html',
      controller: 'ImgChangeCtrl',
      backdrop: 'static',
      resolve: {
        dataScope:function() {
          return {
            user: $scope.user
          }
        }
      }
    });

  }

    /****************************************************
    * update                                            *
    *   @descripcion :: actualiza los datos del usuario *
    *****************************************************/
    $scope.update = function(){
      User.update($scope.user, function(err){
        if (err) {
        };

      });
    };

}]);

app.controller('SecurityController',
  ['$rootScope', '$scope', '$http', '$state', 'User', 'validarPassword', '$translate',
  function($rootScope,  $scope, $http, $state, User, validarPassword, $translate) {

    /*****************************************************
    * Validaciond e password dinamica                    *
    *****************************************************/
    // Contenido y Titulo del Popover
    $scope.popoverContrasena = {
      contenido: '',
      titulo: 'signup.popover.password.titulo'
    };

    $scope.loading = false;

    // Reiniciar los datos del popover
    $scope.validaciones = validarPassword.inicializarData();

    // Criterios para la Contraseña
    $scope.validaciones = validarPassword.criterios;

    // Inicializo el los criterios de la Contraseña
    validarPassword.imprimirContenidoPopover($scope.validaciones, function(contenido){
      $scope.popoverContrasena.contenido = contenido;
    });

    // internacionalizacion
    $rootScope.$on('$translateChangeSuccess', function(){
      validarPassword.imprimirContenidoPopover($scope.validaciones, function(contenido){
        $scope.popoverContrasena.contenido = contenido;
      });
    });

    /*****************************************************
    * testPassword                                       *
    *   @descripcion :: verifica si la contraseña es     *
    *                   valida y actualiza el popover de *
    *                   apoyo.                           *
    ******************************************************/
    $scope.testPassword = function(){
      var resultVal = $scope.$errorValidarPassword;

      // actualizamos el popover de valides de password
      $scope.validaciones.forEach(function(validacion, index){
        if (resultVal[validacion.key]) {
          $scope.validaciones[index].valor = "ok";
          $scope.validaciones[index].color = "text-success";
        }else{
          $scope.validaciones[index].valor = "remove";
          $scope.validaciones[index].color = "text-danger";
        };
      });

      validarPassword.imprimirContenidoPopover($scope.validaciones, function(contenido){
        $scope.popoverContrasena.contenido = contenido;
      });
    };

    /****************************************************
    * isEquals                                          *
    *   @descripcion :: verifica si dos string son      *
    *                   iguales                         *
    *****************************************************/
    $scope.isEquals = function(val1 , val2){
      return val1 == val2;
    };

    /****************************************************
    * Fin de Validaciond e password dinamica            *
    *****************************************************/

    $scope.user = {};

    /****************************************************
    * update                                            *
    *   @descripcion :: actualiza los datos del usuario *
    *****************************************************/
    $scope.changePwd = function(){
      $scope.loading = true;
      User.changePwd($scope.user, function(err){
        if (err) {
          $scope.loading = false;
        };
        $scope.loading = false;
        $state.go('app.page.profile')
      });
    }

}]);


app.controller('ContactController',
  ['$rootScope', '$scope', '$http', '$state', 'User', '$translate',
  function($rootScope,  $scope, $http, $state, User, $translate) {

    $scope.user = {
      emails : []
    };

    $scope.pagina = 1;

    // refrescamos la data que tenemos del user
    User.refresh(function(err){
      if (err) {
        // console.log(err);
      }else{
        var emails = [];

        User.info.emails.forEach(function(email){
          emails.push(email);
        });

        $scope.user.emails = emails;
      }
    });

    $scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.data = [];

    $scope.numberOfPages=function(){
        return Math.ceil($scope.user.emails.length/$scope.pageSize);
    }

}]);


app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});


app.controller('AddEmailController',
  ['$rootScope', '$scope', '$http', '$state', 'User', '$translate',
  function($rootScope,  $scope, $http, $state, User, $translate) {

    $scope.user = {};

    $scope.add = function(){
      User.addEmail($scope.user, function(err, result){
        if (err) {
          // console.log(err);
        }else{

          if ($scope.user.validate) {
            User.validateEmail({rel: result.rel}, function(err){
              if (err) {
                // console.log(err);
              }else{
                $state.go('app.page.profile.contacto');
              };
            });
          }else{
            $state.go('app.page.profile.contacto');
          };
        };
      });
    };
}]);

app.controller('ImgChangeCtrl', [
  '$rootScope',
  '$scope',
  'FileUploader',
  '$http',
  '$state',
  '$interval',
  'User',
  function($rootScope, $scope, FileUploader, $http, $state, $interval, User) {
    $scope.myImage='';
    $scope.myCroppedImage='';
    $scope.cropType="circle";
    $scope.files='';
    $scope.estatus= false;
    var filename = undefined;
    $scope.imageFile = false;
    $scope.imageName = '';
    $scope.selectPreview = false;
    $('.modal-backdrop').removeAttr('style')


    $scope.btnCambiar = function () {
      $scope.imageFile = false;
      $scope.selectPreview = false;
    }

    $scope.loader='ocultar';
    $scope.cuerpo='mostrar';

    $(window).keyup(function (e) {
      if (e.keyCode == 27) {
        $scope.cancel();
      }
    });

    $scope.cancel = function () {

      $('.modal-backdrop').css('opacity',0)
      $('.modal-backdrop').css('z-index','0');
      $('div.modal').children().remove()
      $('div.modal').css('display','none');
    }

    var uploader = $scope.uploader = new FileUploader({
       url: $rootScope.apiUrl+'plataform/user/changeImage',
       alias: 'imagen_perfil',
       autoUpload: false,
       withCredentials: true,
     });

    var handleFileSelect = function(evt) {
      var file = evt.currentTarget.files[0];
      var reader = new FileReader();

      if (file) {
        filename = file.name;
      }

      reader.onload = function(evt) {
        $scope.$apply(function($scope) {
          $scope.myImage = evt.target.result;
          $scope.estatus = true;
        });
      };
      $scope.imageFile = true;
      $scope.imageName = file.name;
      reader.readAsDataURL(file);
    };

    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

    function base64ToBlob(base64Data, contentType) {
      contentType = contentType || '';

      var sliceSize = 1024;
      var byteCharacters = atob(base64Data);
      var bytesLength = byteCharacters.length;
      var slicesCount = Math.ceil(bytesLength / sliceSize);
      var byteArrays = new Array(slicesCount);

      for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
          bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
      }

      var blob = new Blob(byteArrays, { type: contentType});

      return blob;
    };

    $scope.upload = function() {
      var sep = $scope.myCroppedImage.split(';');
      var type = sep[0].replace('data:','');
      var base64 = sep[1];
      var rutaDeImagen = "";
      var file = base64ToBlob(base64.replace('base64,',''), type);
      file.name = filename;

      uploader.addToQueue(file);
      uploader.uploadAll();
      $scope.loader='mostrar';
      $scope.cuerpo='ocultar';
      uploader.onSuccessItem = function(fileItem, response, status, headers) {
        // $state.reload();
        $scope.cancel();

        // refrescamos la data que tenemos del user
        User.refresh(function(err){
          if (err) {
            // console.log(err);
          }
          $state.reload()
        });
        // $modalInstance.dismiss();
        $scope.loader = 'ocultar';
        $scope.cuerpo = 'mostrar';
      };
      uploader.onErrorItem = function(fileItem, response, status, headers) {
        // toaster.pop('error','Error','No se pudo actualizar la imagen. Intente más tarde');
        $scope.loader = 'ocultar';
        $scope.cuerpo = 'mostrar';
        $scope.cancel();
      };
    };

}]);
