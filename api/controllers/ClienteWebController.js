/**
 * ClienteWebController
 *
 * @description :: Server-side logic for managing clientewebs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  auth: function(req, res) {
    return res.view('home');
  },

  admin: function(req, res) {
  	return res.view('home');
  }

};
