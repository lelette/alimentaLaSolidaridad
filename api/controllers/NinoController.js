module.exports = {
    crearFicha: function (req, res) {
        var datos = req.params.all();
        Nino.crearFicha(datos, function (err, newFicha) {
            if (err) return res.serverError(err)
            return res.ok(newFicha)
        })
    },

    eliminarFicha: function (req, res) {
        var datos = req.params.all();
        Nino.eliminar(datos, function (err, ok) {
            if (err) return res.serverError(err)
            return res.ok(ok);
        })
    },

    consultarTodos: function (req, res) {
        Nino.consultarTodos(function (err, ok) {
            if (err) return res.serverError(err)
            return res.ok(ok);
        })
    },

    consultar: function (req, res) {
        var datos = req.params.all();
        Nino.consultar(datos, function (err, ok) {
            if (err) return res.serverError(err)
            return res.ok(ok);
        })
    },

    modificar: function (req, res) {
        var datos = req.params.all();
        Nino.modificar(datos, function (err, ok) {
            if (err) return res.serverError(err)
            return res.ok(ok);
        })
    },

    changeStatus: function (req, res) {
        var datos = req.params.all();
        Nino.changeStatus(datos, function (err, ok) {
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
          Nino.consultar(datos, function (err, resultado) {
            if (err) return res.serverError(err);
            return res.ok(resultado);
          });
        
    }
};