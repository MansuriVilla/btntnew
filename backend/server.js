const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors({ origin: "http://localhost:5173" })); // Update for production URL
app.use(express.json());

// Serve static files from the Vite build output
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// API routes
app.get("/api/visas", (req, res) => {
  const visaData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../frontend/src/data/visaData.json"))
  );
  res.json(visaData);
});

app.post("/api/save-visas", (req, res) => {
  try {
    fs.writeFileSync(
      path.join(__dirname, "../frontend/src/data/visaData.json"),
      JSON.stringify(req.body, null, 2)
    );
    res.status(200).send("Visas saved successfully");
  } catch (error) {
    res.status(500).send("Error saving visas");
  }
});

// Serve React app for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
