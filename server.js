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
});

const PORT = 8000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
