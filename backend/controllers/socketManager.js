const { Server } = require("socket.io");

const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // JOIN ROOM (MEETING)
    socket.on("join-room", (roomId) => {
      socket.join(roomId);

      console.log(`${socket.id} joined room ${roomId}`);

      // notify others in room
      const clients = Array.from(
        io.sockets.adapter.rooms.get(roomId) || []
      ); // FIX

      socket.to(roomId).emit(
        "user-joined",
        socket.id,
        clients
      ); // FIX
    });

    // CHAT MESSAGE
    socket.on("chat-message", ({ roomId, message }) => {
      io.to(roomId).emit("chat-message", {
        sender: socket.id,
        message,
      });
    });

    // WEBRTC SIGNALING
    socket.on("signal", ({ to, signal }) => {
      io.to(to).emit("signal", {
        from: socket.id,
        signal,
      });
    });

    // DISCONNECT
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      // Socket.IO automatically removes user from all rooms

      socket.rooms.forEach((roomId) =>{
        socket.to(roomId).emit('user-left', socket.id);
      });
    });
  });

  return io;
};

module.exports = connectToSocket;
