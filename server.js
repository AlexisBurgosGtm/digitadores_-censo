var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

const execute = require('./router/connection');
var routerSucursales = require('./router/routerSucursales');
var routerEmpleados = require('./router/routerEmpleados');
let routerUsuarios = require('./router/routerUsuarios');
let routerCenso = require('./router/routerCenso');

var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 9900;

app.use(bodyParser.json());

app.use(express.static('build'));

var path = __dirname + '/'

//manejador de rutas
router.use(function (req,res,next) {
  /*
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name, pplication/json');
        // Set to true if you need the website to include cookies in the requests sent
      res.setHeader('Access-Control-Allow-Credentials', true);
  */
  
  next();
});

app.get("/",function(req,res){
  execute.start();
	res.sendFile(path + 'index.html');
}); 


//Router para SUCURSALES
app.use('/sucursales', routerSucursales);

//Router para app CENSO
app.use('/censo', routerCenso);

// Router para empleados o vendedores
app.use('/empleados', routerEmpleados);

// Router para usuarios
app.use('/usuarios', routerUsuarios);


app.use("/",router);

app.use("*",function(req,res){
  res.send('<h1 class="text-danger">NO DISPONIBLE</h1>');
});




// SOCKET HANDLER
io.on('connection', function(socket){
  
  socket.on('chat msn', function(msg,status,user){
	  io.emit('chat msn', msg, status, user);
  });
  
  
});


http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});

