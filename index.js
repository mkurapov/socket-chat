var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');

app.use(express.static(__dirname));

function storeCookies(savedChat)
{
    app.use(cookieSession({
        keys: ['chatHistory', savedChat]
    }));
}


var currentMessages = [];
var savedChat = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    currentMessages.push(msg);
    savedChat = currentMessages.toString();
    storeCookies(savedChat);
  });
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
