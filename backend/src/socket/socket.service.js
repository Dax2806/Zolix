import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Join user room
    socket.on("join", (userId) => {
      socket.join(userId);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  });
};

export const getIO = () => io;

export const emitNotification = (
  userId,
  notification
) => {
  if (!io || !userId) return;

  io.to(userId).emit(
    "notification:new",
    notification
  );
};
