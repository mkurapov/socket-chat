var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;



app.use(express.static(__dirname));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var currentMessages = [];
var savedChat = [];
var users = [];


io.on('connection', function(socket){

  socket.on('chat message', function(msg){
    io.emit('chat message', {msg: msg, username: socket.username});
    currentMessages.push(msg);
    savedChat = currentMessages.toString();
    storeCookies(savedChat);
    console.log(savedChat);

  });

  socket.on('user create', function(user){
    socket.username = user;
    io.emit('user create', user);
    users.push(user);
    console.log(users);


  });
});

function storeCookies(savedChat)
{

}

http.listen(port, function(){
  console.log('listening on *:3000');
});
