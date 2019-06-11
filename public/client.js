
var socket;

socket = io.connect('http://localhost:5050');

var USERNAME = prompt("USERNAME");

function send_message(){
	var message = prompt("MESSAGE FROM " + USERNAME);

	if(message == null){
		;
	}else{

		var user_data = {
			username: USERNAME,
			contents: message
		}

		socket.emit('user_message', user_data);
	}
}

socket.on('server_message', server_message);


// handles the input of messages back from the server to display them properly within html
function server_message(data){
	console.log("server message recieved");
	// grab chat_box div
	var chat_box = document.getElementById('chat_box');
	// debug
	console.log("recieved contents: " + data.contents)


	// create the element for displaying the message onto chat_box
	var element = document.createElement("p");
	var text = document.createTextNode(data.username + ": " + data.contents);
	element.appendChild(text);

	// append the element onto chat_box
	chat_box.appendChild(element);
}


