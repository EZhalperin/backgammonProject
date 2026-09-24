import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { isInvalidName, generateCode, findRoom } from "./helper.js";

export const rooms = [];

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
      game: null,
      rematchAcceptedBy: [],
    };
    socket.join(roomId);
    rooms.push(room);
    console.log(`room ID: ${roomId}`);
    return callback({ success: true });
  });
  socket.on("room:join", (name, roomCode, callback) => {
    if (isInvalidName(name))
      return callback({ success: false, error: "Invalid-name" });
    if (!roomCode)
      return callback({ success: false, error: "Must enter code room" });
    const room = findRoom(roomCode.trim().toUpperCase());
    if (!room) return callback({ success: false, error: "Room not exists" });
    if (room.status != "waiting")
      return callback({ success: false, error: "Room not in status waiting" });
    if (room.playerBlack)
      return callback({ success: false, error: "The room is full" });
    room.playerBlack = { socketId: socket.id, name, color: "black" };
    socket.join(room.roomId);
    console.log(rooms);
    console.log(socket.rooms);

    io.to(room.roomId).emit("room:state", room);
  });
});

httpServer.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
