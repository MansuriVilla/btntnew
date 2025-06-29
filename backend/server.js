const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

// Configure CORS for local Vite frontend
app.use(
  cors({
    origin: "https://btntnew.vercel.app/",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Persistent storage for visaData.json
const dataPath = path.join(__dirname, "../frontend/src/data/visaData.json");
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify([], null, 2));
}

// JWT login endpoint
app.post("/api/login", (req, res) => {
  const { password } = req.body;
  if (
    password === process.env.ADMIN_PASSWORD ||
    password === "##$$btnt_2025#@@!"
  ) {
    // Local testing password
    const token = jwt.sign(
      { user: "admin" },
      process.env.JWT_SECRET || "local-secret",
      { expiresIn: "1h" }
    );
    res.json({ token });
  } else {
    res.status(401).json({ error: "Incorrect password" });
  }
});

// JWT middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  jwt.verify(
    token,
    process.env.JWT_SECRET || "local-secret",
    (err, decoded) => {
      if (err) return res.status(401).json({ error: "Invalid token" });
      next();
    }
  );
};

// API routes
app.get("/api/visas", verifyToken, (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Failed to read visa data" });
  }
});

app.post("/api/save-visas", verifyToken, (req, res) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save visa data" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
