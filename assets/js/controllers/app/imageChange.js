'use strict';

app.controller('ImgChangeCtrl', [
  '$rootScope',
  '$scope',
  'FileUploader',
  '$http',
  '$state',
  '$interval',
  function($rootScope, $scope, FileUploader, $http, $state, $interval) {

    $scope.myImage='';
    $scope.myCroppedImage='';
    $scope.cropType="circle";
    $scope.files='';
    $scope.estatus= false;
    var filename = undefined;

      var uploader = $scope.uploader = new FileUploader({
         url: 'plataform/user/changeImage',
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
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
          //console.info('onSuccessItem', fileItem, response, status, headers);
          // Usuario.usuario.imagen_perfil.nombre_servidor = response.ruta;
          // toaster.pop('success','Imagen','Imagen de perfil actualizada de forma exitosa');
          // Actualizo imagen de perfil
            // $scope.$apply(function() {
            //   if (Usuario.usuario.imagen_perfil.nombre_servidor) {
            //     $scope.user.imgPrevPerfil = $rootScope.apiUrl+Usuario.usuario.imagen_perfil.nombre_servidor.replace('dinamicas','preview');
            //     $scope.user.imgPerfil = $rootScope.apiUrl+Usuario.usuario.imagen_perfil.nombre_servidor;
            //   };
            // }, 1000);
          $state.go('app.page.profile');
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
          // toaster.pop('error','Error','No se pudo actualizar la imagen. Intente más tarde');
        };
      };

}]);
