// create webserver
var express = require('express');
var app = express();
var server = app.listen(5050);
// use 'public' folder for webserver
app.use(express.static('public'));

// create sockets
var socket = require('socket.io');
// create socket input/output handler
var io = socket(server);

// handle client connection sockets
io.sockets.on('connection', connection_made);

function connection_made(socket){
	console.log("a connection has been made from: " + socket.id);

	// handle input from user then repackage input for client to display
	socket.on('user_message', function(data){
		console.log("message recieved -> " + data.username + ":" + data.contents);
		// repackage input data for output display on client
		var server_data = {
			username: data.username,
			contents: data.contents
		}
		// send repackaged data to client for display
		io.sockets.emit('server_message', server_data);
	})
}

// io.socket.on('user_connection', function(socket){
// 	console.log("user " + )
// })

