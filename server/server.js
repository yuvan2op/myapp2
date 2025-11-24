import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from myapp2 backend!" });
});

// Users route example
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "bby" },
    { id: 2, name: "user2" }
  ]);
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
