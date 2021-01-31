const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

var lastMessages = [];

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("initialization", lastMessages);
  console.log(lastMessages);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (data) => {
    console.log(data);
    lastMessages.push(data);
    socket.broadcast.emit("message receveid", data);
  });
});

server.listen(3000, () => {
  console.log("Server is running in port 3000");
});
