import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// Import auth routes
import authRoutes from "./routes/authRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
// Register routes
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/bloodbank")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

// Schema & Model
const requestSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  units: Number,
  contact: String,
  createdAt: { type: Date, default: Date.now }
});

const Request = mongoose.model("Request", requestSchema);

// API Route: Save request
app.post("/api/requests", async (req, res) => {
  try {
    const { name, bloodGroup, units, contact } = req.body;
    const newRequest = new Request({ name, bloodGroup, units, contact });
    await newRequest.save();
    res.status(201).json({ message: "Request saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// API Route: Get all requests (optional for admin panel)
app.get("/api/requests", async (_req, res) => {
  const requests = await Request.find().sort({ createdAt: -1 });
  res.json(requests);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

