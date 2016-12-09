var port = process.env.PORT || 443;
var express = require('express');
var app = express();
//var http = require('http').Server(app);

var fs = require('fs');
//var io = require('socket.io')(http);
var num_user = 0;

var options = {
	key: fs.readFileSync('/etc/letsencrypt/live/freemed.iptime.org/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/freemed.iptime.org/cert.pem')
}

var https = require('https').Server(options, app);
var io = require('socket.io')(https);

app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res) {
console.log('root path access');
	res.redirect('https://freemed.iptime.org:8181/freeMed/jsp');
});

app.use('/chat', function(req, res) {
	res.render('index');
});

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

https.listen(port, function(){
  console.log('Freemed chatting server is listening on port number:' + port);
});
