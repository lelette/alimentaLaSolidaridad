'use strict';

/**
 * @description :: se configuran las ruta de acceso a cada Pantalla de la aplicacion
 */


 // Prefijo de URL para el Core de Servicios
 // var API_URL = 'https://www.neeru.io:9002/';
 var API_URL = 'http://localhost:9002/';

 function apiInterceptor($q, $cookies) {
   return {
     request: function(config) {
       var url = config.url;

       // Se ignoran requests para templates
       if (url.substr(url.length - 5) == '.html') return config || $q.when(config);

       config.headers = config.headers || {};
       config.headers['cookie'] = $cookies.get('sails.sid');
       return config || $q.when(config);
     }
   }
 };
 //
 // angular.module('app').run(function($http) {
 //   $http.get('csrfToken').success(function(data) {
 //     $http.defaults.headers.common['x-csrf-token'] = data._csrf;
 //   });
 // });


angular.module('app')
  .run(
    ['$rootScope', '$state', '$stateParams','$http',
      function ($rootScope,   $state,   $stateParams,$http) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider','JQ_CONFIG', 'MODULE_CONFIG',
      function ($stateProvider,   $urlRouterProvider, $httpProvider, $locationProvider,JQ_CONFIG, MODULE_CONFIG) {

        // Configuración general del servicio $http
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.interceptors.push(apiInterceptor);
				$urlRouterProvider.when('/', '/login')
    //    $urlRouterProvider.when('/app/page/recharge', '/app/page/recharge/contract')
    //    $urlRouterProvider.when('/app/page/home#', '/app/page/home')
        $urlRouterProvider.otherwise('/access/404');

        // con esto nos deberiamos quitar el estorboso # de las urls
        if (window.location.hash && (window.location.hash == '#_=_' || window.location.hash == '#')) {
        if (window.history && history.pushState) {
            window.history.pushState("", document.title, window.location.pathname);
            $locationProvider.html5Mode({
              enabled: true,
              requireBase: false
            });
          }
        }

        $stateProvider
          // session autenticada estandar
          .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: "templates/app.html"
          })
          .state('app.page', {
              url: '/page',
              template: '<div ui-view class="fade-in-down"></div>',
              resolve: load([
                // para usar toaster (mensajes asincronos)
                'js/controllers/app/global.js',
                'js/directives/val-input.js',
                'js/controllers/app/header.js',
                'js/controllers/app/home.js',
                'js/directives/html.js',
              ])
          })
          .state('app.page.newForm', {
            url: '/nino/new',
            templateUrl: 'templates/app/newForm/newForm.html',
            resolve: load([
               'toaster',
               'js/controllers/newFicha/newFicha.js',
               'ngImgCrop',
                'filestyle',
                'angularFileUpload',
                'js/directives/html.js',
               ])
          })
          .state('app.page.adminUsers', {
            url: '/user/admin',
            templateUrl: 'templates/app/admin/adminUsers.html',
            resolve: load([
               'js/controllers/users/admin.js',
               ])
          })
          .state('access.forgotPass', {
            url: '/access/password/recovery/:username',
            templateUrl: 'templates/app/access/forgotPassword.html',
            resolve: load([
               'js/controllers/access_als/forgotPassword.js',
               ])
          })
          .state('app.page.recoverPassword', {
            url: '/user/password/recovery/:username',
            templateUrl: 'templates/app/admin/recoverPassword.html',
            resolve: load([
               'js/controllers/users/pwdrecovery.js',
               ])
          })
          .state('app.page.updateUser', {
            url: '/user/update/:username',
            templateUrl: 'templates/app/admin/updateUsers.html',
            resolve: load([
               'js/controllers/users/update.js',
               ])
          })
          .state('app.page.updateForm', {
            url: '/update/:isNino/:cedula',
            templateUrl: 'templates/app/updateForm/updateForm.html',
            resolve: load([
               'js/controllers/updateFicha/updateFicha.js',
               ])
          })
          .state('app.page.formDetails', {
            url: '/details/:isNino/:cedula',
            templateUrl: 'templates/app/fichaDetails/fichaDetails.html',
            resolve: load([
               'js/controllers/fichaDetails/fichaDetails.js',
               ])
          })
          .state('app.page.adminficha', {
            url: '/adminficha',
            templateUrl: 'templates/app/adminForms/adminForms.html',
            resolve: load([
              'js/controllers/fichas/fichas.js',

            ])
          })
          .state('app.page.historial_peso', {
            url: '/historial_peso/:cedula/:isConsulta',
            templateUrl: 'templates/app/historial_peso/historial_peso.html',
            resolve: load([
              'js/controllers/historial_peso/historial_peso.js',

            ])
          })
          .state('app.page.newHistory', {
            url: '/history/new/:cedula',
            templateUrl: 'templates/app/historial_peso/nuevoHistorial.html',
            resolve: load([
              'js/controllers/historial_peso/historial_peso.js',

            ])
          })
          .state('app.page.newUser', {
            url: '/user/newUser',
            templateUrl: 'templates/app/admin/createUsers.html',
            resolve: load([
              'js/controllers/users/create.js',

            ])
          })
          .state('app.page.estadisticas', {
            url: '/statistics',
            templateUrl: 'templates/app/statistics/statistics.html',
            resolve: load([
              'js/controllers/statistics/statistics.js',

            ])
          })

    
          // autenticacion o inicio de session autenticada
          .state('login', {
              url: '/login',
              templateUrl: 'templates/app/access/signin.html',
              resolve: load( [
                'toaster',
               'js/controllers/access_als/signin.js'
              ])
          })
         
          .state('access.404', {
              url: '/404',
              templateUrl: 'templates/page_404.html'
          });

        function load(srcs, callback) {
          return {
            deps: ['$ocLazyLoad', '$q',
              function( $ocLazyLoad, $q ){
                var deferred = $q.defer();
                var promise  = false;
                srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                if(!promise){
                  promise = deferred.promise;
                }
                angular.forEach(srcs, function(src) {
                  promise = promise.then( function(){
                    if(JQ_CONFIG[src]){
                      return $ocLazyLoad.load(JQ_CONFIG[src]);
                    }
                    angular.forEach(MODULE_CONFIG, function(module) {
                      if( module.name == src){
                        name = module.name;
                      }else{
                        name = src;
                      }
                    });
                    return $ocLazyLoad.load(name);
                  } );
                });
                deferred.resolve();
                return callback ? promise.then(function(){ return callback(); }) : promise;
            }]
          }
        }
      }
    ]
  );
