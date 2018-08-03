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

    searchBar: function (req, res) {
        var datos = {};
          if (req.query.nombreCompleto){
            datos.nombreCompleto = req.query.nombreCompleto;
            datos.nombres = datos.nombreCompleto.split(' ')[0];
            datos.apellidos = datos.nombreCompleto.split(' ')[1];
          }
          if (req.query.cedula) {
              datos.cedula = req.query.cedula;
          }
          Representante.consultar(datos, function (err, resultado) {
            if (err) return res.serverError(err);
            return res.ok(resultado);
          });
        
    },

    changeStatus: function(req, res){
        var datos = req.params.all();
        Representante.changeStatus(datos, function(err, ok){
            if (err) return res.serverError(err)
            return res.ok(ok);
        })
    }
}