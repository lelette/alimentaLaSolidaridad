/**
 * Historial_pesoController
 *
 * @description :: Server-side logic for managing historial_pesoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	eliminar: function(req, res){
        var datos = req.params.all();
        Historial_peso.eliminar(datos, function(err, ok){
            if (err) return res.serverError(err);
            return res.ok(ok);
        });
    },

    agregar: function(req, res){
        var datos = req.params.all();
        console.log(datos);
        Historial_peso.agregar(datos, function(err, ok){
            if (err) return res.serverError(err);
            console.log(ok);
            return res.ok(ok);
        });
    },


};

