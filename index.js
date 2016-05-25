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
var userColorArray = ['#89aeed','#444','#4DB678','#F2AB11','#df5549','#dea8f0'];


io.on('connection', function(socket){

  socket.on('chat message', function(msg){
    io.emit('chat message', {msg: msg, username: socket.username, userColor: socket.userColor});
    currentMessages.push(msg);
    savedChat = currentMessages.toString();
    //console.log(savedChat);

  });

  socket.on('user create', function(user){
    users.push(user);
    socket.username = user;
    var currentIndex = (users.length - 1);
    socket.userColor = userColorArray[currentIndex];
    //io.emit('user create', user);

    console.log(users);


  });
});

function storeCookies(savedChat)
{

}

http.listen(port, function(){
  console.log('listening on *:3000');
});
