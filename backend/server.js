const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const app = express();

// CORS configuration for Vercel frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Persistent storage for visaData.json
const dataPath = "/data/visaData.json";
if (!fs.existsSync(dataPath)) {
  fs.copyFileSync(path.join(__dirname, "./visaData.json"), dataPath);
}

// JWT login endpoint
app.post("/api/login", (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ user: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Incorrect password" });
  }
});

// JWT middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    next();
  });
};

// API routes
app.get("/api/visas", verifyToken, (req, res) => {
  try {
    const visaData = JSON.parse(fs.readFileSync(dataPath));
    res.json(visaData);
  } catch (error) {
    res.status(500).send("Error reading visas");
  }
});

app.post("/api/save-visas", verifyToken, (req, res) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(req.body, null, 2));
    res.status(200).send("Visas saved successfully");
  } catch (error) {
    res.status(500).send("Error saving visas");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
