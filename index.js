var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');


app.use(cookieParser());

app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined)
  {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  }
  else
  {
    // yes, cookie was already present
    console.log('cookie exists', cookie);
  }
  next(); // <-- important!
});


app.use(express.static(__dirname));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var currentMessages = [];
var savedChat = [];


io.on('connection', function(socket){

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    currentMessages.push(msg);
    savedChat = currentMessages.toString();
    storeCookies(savedChat);
    console.log(savedChat);

  });
});

function storeCookies(savedChat)
{

}

http.listen(port, function(){
  console.log('listening on *:3000');
});
