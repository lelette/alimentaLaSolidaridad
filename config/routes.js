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

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  /**************************************************************************
  *                                                                         *
  * Rutas de prueba ventas                                                  *
  *                                                                         *
  **************************************************************************/

  /**************************************************************************
  *                                                                         *
  * Rutas de Cliente Web                                                    *
  *                                                                         *
  **************************************************************************/

  /**************************************************************************
  * Ruta para home de la pagina                                             *
  **************************************************************************/
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
    controller: 'ClienteWebController',
    action: 'auth',
    locals: {
      layout: 'layouts/neeru'
    }
  },

  /**************************************************************************
  * Rutas del cliente web admin                                             *
  **************************************************************************/
  '/admin/*' : {
    controller: 'ClienteWebController',
    action: 'admin',
    locals: {
      layout: 'layouts/neeru'
    }
  },


  /**************************************************************************
  *                                                                         *
  * Rutas de servicios Web                                                  *
  *                                                                         *
  **************************************************************************/

  /**************************************************************************
  * Ruta para la autenticacion de usuario                                   *
  **************************************************************************/
  '/plataform/user/signin': 'UserController.signin',

  /**************************************************************************
  * Ruta para cerrar la session autenticada del usuario                     *
  **************************************************************************/
  '/plataform/user/logout': 'UserController.logout',

  /**************************************************************************
  * Ruta para registro de usuario                                           *
  **************************************************************************/
  '/plataform/user/signup': 'UserController.signup',

	/**************************************************************************
	* Ruta para generar forgotpw                                              *
	**************************************************************************/
	'/plataform/forgotpwd/generate': 'UserController.generateForgotPwd',

	/**************************************************************************
	* Ruta para aplicar forgotpwd                                             *
	**************************************************************************/
	'/plataform/forgotpwd/apply': 'UserController.applyForgotPwd',

	/**************************************************************************
	* Ruta para el cambio de la contraseña del usuario                        *
	**************************************************************************/
	'/plataform/user/changePassword': "UserController.changePassword",

	/**************************************************************************
	* Ruta para consulta de datos basicos del usuario                         *
	**************************************************************************/
	'/plataform/user/getProfile': "UserController.getProfile",

	/**************************************************************************
	* Ruta para actualizacion de datos basicos del usuario                    *
	**************************************************************************/
	'/plataform/user/updateProfile': "UserController.updateProfile",

  /**************************************************************************
  * Ruta para agregar un nuevo email al usuario autenticado                 *
  **************************************************************************/
  '/plataform/user/addEmail': "UserController.addEmail",

	/**************************************************************************
	* Ruta para remover un email al usuario autenticado                       *
	**************************************************************************/
	'/plataform/user/removeEmail': "UserController.removeEmail",

  /**************************************************************************
  * Ruta para solicitar la informacion de usuarios activos del sistema      *
  **************************************************************************/
  '/plataform/user/users': "UserController.getUsers",

  /**************************************************************************
  * Ruta para bloquear a un usuario del sistema                             *
  **************************************************************************/
  '/plataform/user/lock': "UserController.lock",

  /**************************************************************************
  * Ruta para habilitar o deshabilitar privilegios a un usuario             *
  **************************************************************************/
  '/plataform/user/privilege/enable': 'UserController.enablePrivilege',

  /**************************************************************************
  * Ruta para generar validacion                                            *
  **************************************************************************/
  '/plataform/validation/generate': 'ValidationController.generate',

  /**************************************************************************
  * Ruta para aplicar validacion                                            *
  **************************************************************************/
  '/plataform/validation/apply': 'ValidationController.apply',

  /**************************************************************************
  * Ruta para consultar la oferta de servicios de                           *
  **************************************************************************/
  '/plataform/offer': 'OfertaController.getOfertas',

	/**************************************************************************
	* Ruta para solicitar una recarga                                         *
	**************************************************************************/
	'/plataform/sales/recharge': 'SalesController.recharge',

  /**************************************************************************
  * Ruta para consultar todas las transacciones realizadas por el usuario   *
  * autenticado                                                             *
  **************************************************************************/
  '/plataform/sale/getTransactions': 'SalesController.transactions',

  /**************************************************************************
  * Ruta para consultar todas las transacciones realizadas en el sistema    *
  **************************************************************************/
  '/plataform/sale/getAllTransactions': 'SalesController.allTransactions',

	/**************************************************************************
	* Ruta para realizar una consulta de tasa de cambio a USD                 *
	**************************************************************************/
	'/plataform/sale/getTCUSD': 'SalesController.getTCUSD',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
