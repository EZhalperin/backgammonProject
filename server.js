import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const server = express();
const httpServer = createServer(server);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
