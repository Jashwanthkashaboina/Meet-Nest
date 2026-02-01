import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";

import connectToSocket from "./controllers/socketManager.js";
import userRoutes from "./routes/user.js";

const app = express();
const server = http.createServer(app);

// Increase max listeners globally to prevent warnings
import process from "process";
process.setMaxListeners(20);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/home", (req, res) => {
  res.send("Hello! This is the home page.");
});

app.use("/user", userRoutes);

// Socket.io initialization
const io = connectToSocket(server);
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);
});

// MongoDB connection
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

main();

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
