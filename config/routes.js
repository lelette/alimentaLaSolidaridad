/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {



  /**************************************************************************
  * Ruta para home de la pagina                                             *
  **************************************************************************/
  '/landing/*': {
    view: 'home',
    locals: {
      layout: 'layouts/neeru'
    }
  },

  /**************************************************************************
  * Ruta para home de la pagina                                             *
  **************************************************************************/
  '/login': {
    view: 'home',
    locals: {
      layout: 'layouts/neeru'
    }
  },

    '/': {
    view: 'home',
    locals: {
      layout: 'layouts/neeru'
    }
  },

  /**************************************************************************
  * Rutas relacionadas al acceso al sistema                                 *
  **************************************************************************/
  '/access/*' : {
    view: 'home',
    locals: {
      layout: 'layouts/neeru'
    }
  },


  /**************************************************************************
  * Rutas del cliente web                                                   *
  **************************************************************************/
  '/app/*' : {
    //controller: 'ClienteWebController',
    //action: 'auth',
    view: 'home',
    locals: {
      layout: 'layouts/neeru'
    }
  },



  /**************************************************************************
  * Rutas del cliente web admin                                             *
  **************************************************************************/
  '/admin/*' : {
    //controller: 'ClienteWebController',
    //action: 'admin',
    locals: {
      layout: 'layouts/neeru'
    }
  },


 



  /************************************************************************
  * RUTAS DE ALIMENTA LA SOLIDARIDAD
  */

  //  RUTAS DE NINOS 
  
  'POST /api/nino/create': 'NinoController.crearFicha',

  'POST /api/nino/delete': 'NinoController.eliminarFicha',

  'GET /api/nino/getAll': 'NinoController.consultarTodos',

  'POST /api/nino/getSome': 'NinoController.consultar',

  'GET /api/nino/searchBar': 'NinoController.searchBar',

  'POST /api/nino/update': 'NinoController.modificar',

  'POST /api/nino/changeStatus': 'NinoController.changeStatus',

  // RUTAS DE HISTORIAL 

  'POST /api/historial/eliminar': 'Historial_pesoController.eliminar',

  'POST /api/historial/agregar': 'Historial_pesoController.agregar',

  // RUTAS DE REPRESENTANTE

  'POST /api/representante/create': 'RepresentanteController.crearFicha',

  'GET /api/representante/getAll': 'RepresentanteController.consultarTodas',

  'POST /api/representante/getSome': 'RepresentanteController.consultar',

  'POST /api/representante/delete': 'RepresentanteController.eliminar',

  'POST /api/representante/update': 'RepresentanteController.modificar',

  'POST /api/representante/changeStatus': 'RepresentanteController.changeStatus',

  'GET /api/representante/searchBar': 'RepresentanteController.searchBar',

   //RUTAS DE USUARIO
  'POST /api/user/create': 'UserController.create',

  'POST /api/user/login': 'UserController.login',

  'POST /api/user/logout': 'UserController.logout',

  'POST /api/user/delete': 'UserController.eliminar',

  'POST /api/user/update': 'UserController.modificar',

  'POST /api/user/password': 'UserController.cambiarpassword',

  'GET /api/user/getAll': 'UserController.consultarTodos',

  'GET /api/user/get': 'UserController.consultar',

  'GET /api/user/estadisticas': 'UserController.estadisticas',

/*******************************************************************************
 * FIN DE RUTAS DE ALIMENTA LA SOLIDARIDAD
 */


};
