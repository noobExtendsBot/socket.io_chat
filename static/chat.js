// connect to socket io server
var socket = io.connect("http://localhost:4000");
console.log(socket);

// DOM
var message = document.getElementById("message");
var handle = document.getElementById("handle");
var button = document.getElementById("send");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");

// Emit on button send
button.addEventListener("click", function () {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
});

// Listen for events
socket.on("chat", function (data) {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strog>" + data.handle + "</strog>:" + data.message + "</p>";
  message.value = "";
});

message.addEventListener("keypress", function () {
  socket.emit("typing", handle.value);
});

socket.on("typing", function (data) {
  feedback.innerHTML = "<p><em>" + data + ": is typing a message..</em></p>";
});
