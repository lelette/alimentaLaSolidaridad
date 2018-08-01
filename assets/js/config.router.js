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
        $urlRouterProvider.when('/app/page/recharge', '/app/page/recharge/contract')
        $urlRouterProvider.when('/app/page/home#', '/app/page/home')
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
          .state('landing', {
              url: '/landing',
              templateUrl: 'templates/landing.html',
              resolve: load([
                'js/directives/val-input.js',
              ])
          })
          // autenticacion o inicio de session autenticada
          .state('landing.home', {
              url: '/home',
              templateUrl: 'templates/landing/home.html',
              resolve: load([
                'js/controllers/landingHome.js'
              ])
          })
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
                'toaster',
                'js/services/User.js',
                'js/services/Recharge.js',
                'js/controllers/app/global.js',
                'js/directives/val-input.js',
                'js/controllers/app/header.js',
                'js/controllers/app/home.js',
                'js/directives/html.js',
              ])
          })
          .state('app.page.newForm', {
            url: '/new',
            templateUrl: 'templates/app/newForm/newForm.html',
            resolve: load([
               'toaster',
               'js/controllers/newFicha/newFicha.js',
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
          .state('app.page.recharge.cal_amount', {
            url: '/amount',
            templateUrl: 'templates/app/recharge/calAmount.html',
            resolve: load([])
          })
          .state('app.page.recharge.get_token_stripe', {
            url: '/tdc',
            templateUrl: 'templates/app/recharge/getTokenStripe.html',
            resolve: load(['js/stripe/stripe.js'])
          })
          .state('app.page.recharge.confirm', {
            url: '/confirm',
            templateUrl: 'templates/app/recharge/confirm.html',
            resolve: load([])
          })
          .state('app.page.rechargeResult', {
            url: '/rechargeResult',
            templateUrl: 'templates/app/recharge/result.html',
            resolve: load([
              'toaster',
              'js/controllers/app/rechargeResult.js'
            ])
          })
          // fin recharge #######################################

          // State para tarjetas afiliadas #########################
          .state('app.page.tdc_afiliadas', {
            url: '/tdc_afiliadas',
            templateUrl: 'templates/app/recharge/tdc_afiliadas.html',
            resolve: load([
              'toaster',
              'js/controllers/app/tdcController.js',
              'js/directives/val-input.js',
            ]),
          })
          // #######################################################

          // Transacciones ######################################
          .state('app.page.transactions', {
            url: '/transactions',
            templateUrl: 'templates/app/movimientos/movimientos.html',
            resolve: load([
              'toaster',
              'js/controllers/app/transactions.js'
            ])
          })
          .state('app.page.transactionDetail', {
            url: '/transactionDetail/:id',
            templateUrl: 'templates/app/movimientos/movDetalles.html',
            resolve: load([
              'toaster',
              'js/controllers/app/transactionDetail.js'
            ])
          })
          // Fin de Transacciones ###############################

          // Numeros Frecuentes ################################
          .state('app.page.frequent', {
            url: '/frequent',
            templateUrl: 'templates/app/numeroFrecuente/numeroFrecuente.html',
            resolve: load([
                'toaster',
                'js/controllers/app/frequentController.js',
                'dataTable'
              ])
          })
          // Fin de Frecuentes ###############################

          //*******************************HOME*******************************
          .state('app.page.home', {
            url: '/home',
            templateUrl: 'templates/app/home/home.html',
            resolve: load([
              'toaster',
              'js/controllers/app/home.js'
            ])
          })
          //***************** FIN DE HOME *************************************
          // perfil #############################################
          .state('app.page.profile', {
            url: '/profile',
            templateUrl: 'templates/app/profile/profile.html',
            resolve: load([
                'toaster',
                'js/directives/val-input.js',
                'ngImgCrop',
                'filestyle',
                'angularFileUpload',
                'js/directives/html.js',
                'js/controllers/app/profile.js'
              ])
          })
          .state('app.page.profile.imageChange', {
            url: '/changeImage',
            templateUrl: 'templates/app/profile/changeImage.html',
            resolve: load([
              'ngImgCrop',
              'filestyle',
              'angularFileUpload'
            ])
          })
          .state('app.page.profile.contacto', {
            url: '/contact',
            templateUrl: 'templates/app/profile/contacto.html',
          })
          .state('app.page.profile.add_email', {
            url: '/addEmail',
            templateUrl: 'templates/app/profile/contacto_add_email.html',
          })
          .state('app.page.profile.security', {
            url: '/security',
            templateUrl: 'templates/app/profile/security.html',
            resolve: load([
              'toaster',
              'js/services/Password.js'
              ])
          })
          // fin perfil ########################################
          // admin
          .state('admin', {
            abstract: true,
            url: '/admin',
            templateUrl: 'templates/admin.html'
          })
          .state('admin.page', {
              url: '/page',
              template: '<div ui-view class="fade-in-down"></div>',
              resolve: load([
                'js/services/User.js',
                'js/controllers/app/global.js',
                'js/controllers/app/header.js',
              ])
          })
          .state('admin.page.index', {
            url: '/index',
            templateUrl: 'templates/admin/index.html'
          })
          .state('admin.page.users', {
            url: '/users',
            templateUrl: 'templates/admin/users.html',
            resolve: load(['js/controllers/admin/users.js'])
          })
          .state('admin.page.transactions', {
            url: '/transactions',
            templateUrl: 'templates/admin/transactions.html',
            resolve: load(['js/controllers/admin/transactions.js'])
          })
          // fin admin
          // bloqueo
          .state('lockme', {
            url: '/lockme',
            templateUrl: 'templates/page_lockme.html'
          })

          // no autenticado
          .state('access', {
              url: '/access',
              templateUrl: 'templates/access.html',
              resolve: load([
                'toaster',
                'js/services/Password.js',
                'js/directives/val-input.js',
                'js/directives/html.js'
              ])
          })
          // autenticacion o inicio de session autenticada
          .state('login', {
              url: '/login',
              templateUrl: 'templates/access/signin.html',
              resolve: load( [
                'toaster',
               'js/controllers/access/signin.js'
              ])
          })
          // registro de usuario ################################
          .state('access.signup', {
            url: '/signup',
            templateUrl: 'templates/access/signup.html',
            resolve: load( [
              'toaster',
              'js/controllers/access/signup.js'
            ])
          })
          // registro de usuario ################################
          .state('access.terminos', {
            url: '/terminos',
            templateUrl: 'templates/access/terminos/terminosycondiciones.html',
            resolve: load( ['js/controllers/access/terminos/terminos.js'] )
          })
          .state('access.emitValEmail', {
            url: '/emitValEmail',
            templateUrl: 'templates/access/emit_val_email.html'
          })
          .state('access.applyValEmail', {
            url: '/applyValEmail',
            templateUrl: 'templates/access/apply_val_email.html',
            resolve: load([
              'toaster',
              'js/controllers/access/applyValEmail.js'
            ])
          })
          // fin registro de usuario ############################
          // Recuperacion de password ###########################
          .state('access.forgotpwd', {
              url: '/forgotpwd',
              templateUrl: 'templates/access/forgotpwd.html',
              resolve: load([
                'toaster',
                'js/controllers/access/forgotpwd.js'
              ])
          })
          .state('access.applyForgotPwd', {
              url: '/applyForgotPwd',
              templateUrl: 'templates/access/applyForgotPwd.html',
              resolve: load([
                'toaster',
                'js/controllers/access/forgotpwd.js'
              ])
          })
          .state('access.successforgotpwd', {
              url: '/successForgotPwd',
              templateUrl: 'templates/access/successForgotPwd.html'
          })
          .state('access.successappplyfp', {
              url: '/successappplyfp',
              templateUrl: 'templates/access/successappplyfp.html'
          })
          // fin recuperacion de password ########################
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
