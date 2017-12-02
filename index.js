var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

function emit(req, method) {
  console.log("new request");

  var now = new Date();

  var info = {
    timestamp: now.toUTCString(),
    url: req.originalUrl,
    method: method,
    body: req.body,
    headers: req.headers
  };

  io.emit('request', JSON.stringify(info, null, 2));

  return info;
}


app.get('/echo/*', function(req, res) {
  res.send(emit(req, "get"));
});
app.post('/echo/*', function(req, res) {
  res.send(emit(req, "post"));
});
app.put('/echo/*', function(req, res) {
  res.send(emit(req, "put"));
});
app.patch('/echo/*', function(req, res) {
  res.send(emit(req, "patch"));
});
app.delete('/echo/*', function(req, res) {
  res.send(emit(req, "delete"));
});
app.copy('/echo/*', function(req, res) {
  res.send(emit(req, "copy"));
});
app.head('/echo/*', function(req, res) {
  res.send(emit(req, "head"));
});
app.options('/echo/*', function(req, res) {
  res.send(emit(req, "options"));
});
app.link('/echo/*', function(req, res) {
  res.send(emit(req, "link"));
});
app.unlink('/echo/*', function(req, res) {
  res.send(emit(req, "unlink"));
});
app.purge('/echo/*', function(req, res) {
  res.send(emit(req, "purge"));
});
app.lock('/echo/*', function(req, res) {
  res.send(emit(req, "lock"));
});
app.unlock('/echo/*', function(req, res) {
  res.send(emit(req, "unlock"));
});
app.propfind('/echo/*', function(req, res) {
  res.send(emit(req, "propfind"));
});



io.on('connection', function(socket) {
  console.log("new client");
  socket.on('request', function(info) {
    io.emit('request', info);
  });
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});
