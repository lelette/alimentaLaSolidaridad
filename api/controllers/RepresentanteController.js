module.exports = {
    crearFicha: function(req, res){
        var datos = req.params.all();
        Representante.crearFicha(datos, function(err, newFicha){
            if (err) return res.serverError(err)
            return res.ok(newFicha)
        })
    },

    consultarTodas: function(req, res){
        Representante.consultarTodas(function(err, todas){
            if (err) return res.serverError(err)
            return res.ok(todas)
        })
    },

    consultar: function(req, res){
        var datos = req.params.all();
        Representante.consultar(datos, function(err, ok){
            if (err) return res.serverError(err)
            return res.ok(ok);
        })
    },

    eliminar: function(req, res){
        var datos = req.params.all();
        Representante.eliminar(datos, function(err, ok){
            if (err) return res.serverError(err)
            return res.ok(ok);
        })
    },

    modificar: function(req, res){
        var datos = req.params.all();
        Representante.modificar(datos, function(err, ok){
            if (err) return res.serverError(err)
            return res.ok(ok);
        })
    },

    changeStatus: function(req, res){
        var datos = req.params.all();
        Representante.changeStatus(datos, function(err, ok){
            if (err) return res.serverError(err)
            return res.ok(ok);
        })
    }
}