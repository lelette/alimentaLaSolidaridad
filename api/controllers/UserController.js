/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        var datos = req.params.all();
        User.crear(datos, function (err, user) {
            if (err) return res.serverError(err);
            return res.ok(user);
        })
    },

    consultarTodos: function (req, res) {
        User.consultarTodos(function (err, user) {
            if (err) return res.serverError(err);
            return res.ok(user);
        })
    },

    consultar: function(req, res){
        var datos = {};
        if (req.query.username){
          datos.username = req.query.username;
        }
                User.consultar({username: datos.username}, function(err, oki){
            if (err) return res.serverError(err);
            return res.ok(oki);
        })
    },

    login: function (req, res) {
        var datos = req.params.all();
        User.login(datos, function (err, ok) {
            if (err) return res.serverError(err);
            req.session.user = ok;
            return res.ok(ok);
        })
    },

    logout: function (req, res) {
        req.session.destroy(function () { });
        //req.logout();
        return res.ok({ logout: true });
    },

    eliminar: function(req, res){
        var datos = req.params.all();
        User.eliminar(datos, function(err, ok){
            if (err) return res.serverError(err)
            return res.ok(ok);
        })
    },

    modificar: function(req, res){
        var datos = req.params.all();
        User.modificar(datos, function(err, ok){
            if (err) return res.serverError(err)
            return res.ok(ok);
        })
    },

    cambiarpassword: function(req, res){
        var datos = req.params.all();
        User.cambiarpassword(datos, function(err, ok){
            if (err) return res.serverError(err)
            return res.ok(ok);
        })
    },

    estadisticas: function(req, res){
        User.estadisticas(function(err, stats){
            return res.ok(stats);
        })
    }

};

