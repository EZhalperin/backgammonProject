import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { isInvalidName, generateCode } from "./helper.js";

const rooms = [];

const server = express();
const httpServer = createServer(server);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("room:create", (name, callback) => {
    if (isInvalidName(name))
      return callback({ success: false, error: "Invalid-name" });
    const roomId = generateCode();
    const room = {
      roomId,
      status: "waiting",
      ownerSocketId: socket.id,
      playerWhite: { socketId: socket.id, name, color: "white" },
      gane: null,
      rematchAcceptedBy: [],
    };
    socket.join(roomId);
    rooms.push(room);
    console.log(`room ID: ${roomId}`);
    return callback({ success: true });
  });
});

httpServer.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
