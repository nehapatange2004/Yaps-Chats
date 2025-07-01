import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://192.168.38.162:5173",
      "http://192.168.43.162:5173",
      "http://192.168.176.162:5173",
      "http://localhost:5173",
      "https://yaps-chats.netlify.app",
    ],
  },
});

export const getReceiverSocketId = (userId) => {
  return onlineUsersSocketMap[userId];
};
const onlineUsersSocketMap = [];

io.on("connection", (socket) => {
  //   console.log("A user connected: ", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    // console.log("userId: ", userId);
    onlineUsersSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(onlineUsersSocketMap));
    console.log("onlnie Users: ", onlineUsersSocketMap);
  }

  socket.on("sendTypingStatus", ({ to, from }) => {
    console.log("to: ", to);
    const receiverSocketId = onlineUsersSocketMap[to];
    if (receiverSocketId) {
      console.log("Typeing send");
      io.to(receiverSocketId).emit("showTypingStatus", {from});
    }
  });
  socket.on("disconnect", () => {
    console.log("a user disconnected: ", socket.id);
    delete onlineUsersSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUsersSocketMap));
  });

  // socket.on("online-users", () => {});
});

export { app, server, io };
