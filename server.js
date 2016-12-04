var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var num_user = 0;

app.use('/', express.static( __dirname + '/public'));

io.on('connection', function(socket) {
	console.log('a user connected');
	num_user++;
	io.emit('sys_message', '유저 한명이 새로 접속했습니다. 유저수:' + num_user);
	socket.on('disconnect', function() {
		num_user--;
		io.emit('sys_message', '유저 한명이 퇴장했습니다. 유저수:' + num_user);
		console.log('user disconnected');
	});
	socket.on('message', function(msg){
		io.emit('message', msg);
	});
});

http.listen(port, function(){
  console.log('Freemed chatting server is listening on port number:' + port);
});
