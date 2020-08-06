var express = require("express");
var socket = require("socket.io");

// App setup
var app = express();
//  server
var server = app.listen(4000, function () {
  console.log("listen to port 4000");
});
// serve the static files
app.use(express.static("static"));

// socket setup
var io = socket(server);

io.on("connection", function (socket) {
  console.log("made socket connection", socket.id);

  // chat event
  socket.on("chat", function (data) {
    // send message to everyone connected to socket
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
