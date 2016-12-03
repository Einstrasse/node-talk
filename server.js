var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static( __dirname + '/public'));

io.on('connection', function(socket) {
	console.log('a user connected');
	io.emit('sys_message', '유저 한명이 새로 접속했습니다.');
	socket.on('disconnect', function() {
		io.emit('sys_message', '유저 한명이 퇴장했습니다.');
		console.log('user disconnected');
	});
	socket.on('message', function(msg){
		io.emit('message', msg);
	});
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
