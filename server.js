var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/gestionvuelos');

var Vuelos = mongoose.model('Vuelos', {
  ciudad: String,
  precio: String
})

var Reservas = mongoose.model('Reservas', {
  nombre: String,
  cedula: Number,
  edad: Number,
  dia_reserva: String,
  ciudad: String,
  precio: String
})

app.use( express.static(__dirname +'/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/api/vuelos',function(req, res){
  Vuelos.create({
    ciudad: req.body.ciudad,
    precio: req.body.precio
  }, function(error, vuelos){
    if(error){
      res.send(error);
    }
    Vuelos.find(function(error, vuelos){
      if(error){
        res.send(error);
      }
      res.json(vuelos);
    })
  })
})

app.post('/api/reservas',function(req, res){
  Reservas.create({
    nombre: req.body.nombre,
    cedula: req.body.cedula,
    edad: req.body.edad,
    dia_reserva: req.body.dia_reserva,
    ciudad: req.body.ciudad,
    precio: req.body.precio
  }, function(error, reservas){
    if(error){
      res.send(error);
    }
    Reservas.find(function(error, reservas){
      if(error){
        res.send(error);
      }
      res.json(reservas);
    })
  })
})
app.get('/api/vuelos',function(req, res){
  Vuelos.find(function(error, vuelos){
    if(error){
      res.send(error);
    }
    res.json(vuelos);
  })
})

app.get('/api/reservas',function(req, res){
  Reservas.find(function(error, reservas){
    if(error){
      res.send(error);
    }
    res.json(reservas);
  })
})

app.get('*',function(req, res){
  res.sendFile('./public/index.html')
})

app.listen(8080, function(){
  console.log("welocome server");
});
