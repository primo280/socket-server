require('dotenv').config(); // Charger les variables d'environnement

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGIN || "*", // Ex: http://localhost:3000
  },
});

io.on("connection", (socket) => {
  console.log("✅ Un utilisateur est connecté :", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`👥 Utilisateur ${socket.id} a rejoint la room ${roomId}`);
  });

  socket.on("message", ({ room, from, message }) => {
    io.to(room).emit("message", { from, room, message });
  });

  socket.on("disconnect", () => {
    console.log("❌ Utilisateur déconnecté :", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Serveur Socket.IO sans Express sur http://localhost:${PORT}`);
});
