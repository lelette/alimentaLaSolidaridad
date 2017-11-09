'use strict';

/**
 * @description :: se configuran las ruta de acceso a cada Pantalla de la aplicacion
 */


 // Prefijo de URL para el Core de Servicios
 //var API_URL = 'http://localhost:9002/';
 var API_URL = 'http://192.168.3.96:9002/';

 function apiInterceptor($q, $cookies) {
   return {
     request: function(config) {
       var url = config.url;
       var regex = new RegExp("^(http[s]?:\\/\\/www\\.google\\.com)");

       // Se ignoran requests para templates
       if (url.substr(url.length - 5) == '.html') return config || $q.when(config);

       // Se ingoran rutas de google
       if (regex.test(url)) return config || $q.when(config);

       config.headers = config.headers || {};
       config.headers['cookie'] = $cookies.get('sails.sid');
       config.url = API_URL + config.url;
       return config || $q.when(config);
     }
   }
 };
/*
 angular.module('app').run(function($http) {
   $http.get('csrfToken').success(function(data) {
     $http.defaults.headers.common['x-csrf-token'] = data._csrf;
   });
 });
 */

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
    [          '$stateProvider', '$urlRouterProvider', '$httpProvider', 'JQ_CONFIG', 'MODULE_CONFIG',
      function ($stateProvider,   $urlRouterProvider, $httpProvider, JQ_CONFIG, MODULE_CONFIG) {

        // Configuración general del servicio $http
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.interceptors.push(apiInterceptor);
				$urlRouterProvider.when('/', '/access/signin');
        $urlRouterProvider.otherwise('/access/404');

        $stateProvider
          .state('landing', {
              url: '/landing',
              templateUrl: 'templates/landing.html',
              resolve: load([])
          })
          // autenticacion o inicio de session autenticada
          .state('landing.home', {
              url: '/home',
              templateUrl: 'templates/landing/home.html',
              resolve: load([])
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
          // .state('app.page.index', {
          //   url: '/index',
          //   templateUrl: 'templates/index.html',
          //   resolve: load([
          //     'js/controllers/app/index.js',
          //     'js/services/Sales.js'
          //     ])
          // })
          // recharge ###########################################
          .state('app.page.recharge', {
            url: '/recharge',
            templateUrl: 'templates/app/recharge/reload.html',
            params: {'cod': '', 'contrato': ''},
            resolve: load([
              'js/controllers/app/recharge.js',
              'js/directives/stripe.js',
              'js/services/Sales.js'
              ])
          })
          .state('app.page.recharge.get_contrato', {
            url: '/contract',
            templateUrl: 'templates/app/recharge/getContrato.html',
            resolve: load([])
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
          .state('app.page.recharge.result', {
            url: '/result',
            templateUrl: 'templates/app/recharge/result.html',
            resolve: load([])
          })
          // fin recharge #######################################

          // State para tarjetas afiliadas #########################
          .state('app.page.tdc_afiliadas', {
            url: '/tdc_afiliadas',
            templateUrl: 'templates/app/recharge/tdc_afiliadas.html',
            resolve: load([
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
              'js/controllers/app/transactions.js'
            ])
          })
          .state('app.page.transactionDetail', {
            url: '/transactionDetail/:id',
            templateUrl: 'templates/app/movimientos/movDetalles.html',
            resolve: load([
              'js/controllers/app/transactionDetail.js'
            ])
          })
          // Fin de Transacciones ###############################

          // Numeros Frecuentes ################################
          .state('app.page.frequent', {
            url: '/frequent',
            templateUrl: 'templates/app/numeroFrecuente/numeroFrecuente.html',
            resolve: load([
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
              'js/controllers/app/home.js'
            ])
          })
          //***************** FIN DE HOME *************************************
          // perfil #############################################
          .state('app.page.profile', {
            url: '/profile',
            templateUrl: 'templates/app/profile/profile.html',
            resolve: load([
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
                'js/services/Password.js',
                'js/directives/val-input.js',
                'js/directives/html.js'
              ])
          })
          // autenticacion o inicio de session autenticada
          .state('access.signin', {
              url: '/signin',
              templateUrl: 'templates/access/signin.html',
              resolve: load( ['js/controllers/access/signin.js'] )
          })
          // registro de usuario ################################
          .state('access.signup', {
            url: '/signup',
            templateUrl: 'templates/access/signup.html',
            resolve: load( ['js/controllers/access/signup.js'] )
          })
          .state('access.emitValEmail', {
            url: '/emitValEmail',
            templateUrl: 'templates/access/emit_val_email.html'
          })
          .state('access.applyValEmail', {
            url: '/applyValEmail',
            templateUrl: 'templates/access/apply_val_email.html',
            resolve: load(['js/controllers/access/applyValEmail.js'])
          })
          // fin registro de usuario ############################
          // Recuperacion de password ###########################
          .state('access.forgotpwd', {
              url: '/forgotpwd',
              templateUrl: 'templates/access/forgotpwd.html',
              resolve: load(['js/controllers/access/forgotpwd.js'])
          })
          .state('access.applyForgotPwd', {
              url: '/applyForgotPwd',
              templateUrl: 'templates/access/applyForgotPwd.html',
              resolve: load(['js/controllers/access/forgotpwd.js'])
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
