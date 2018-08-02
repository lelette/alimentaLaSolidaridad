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
        var datos = {
            nombres: req.query.nombres,
            apellidos: req.query.apellidos
          };
          console.log(datos);
          if (req.query.page) datos.paginacion = req.query.page;
          if (req.query.limit) datos.cantidad = req.query.limit;
          Usuario.consultarTodos(datos, function (err, usuarios) {
            if (err) return res.responder(err);
            return res.responder(usuarios);
          });
        
    }
};