const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// run when  clients connect
io.on("connection", (socket) => {
  console.log("new ws connection..");

  socket.emit("message", "welcome to chatexpress");

  // broadcast when user join
  socket.broadcast.emit("message", " a user has joined the chat");

  // when client disconnect
  socket.on("disconnect", () => {
    io.emit("message", "a user has left the chat");
  });
});

const PORT = 8000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
