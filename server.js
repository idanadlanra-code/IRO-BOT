const express = require("express");
const app = express();

app.use(express.json());

// בדיקת שרת
app.get("/", (req, res) => {
  res.send("Server is alive");
});

// webhook
app.post("/webhook", (req, res) => {
  console.log("📩 BODY:", req.body);

  return res.status(200).json({ success: true });
});

// ❗ חשוב: fallback רק אם לא נמצא route
app.use((req, res) => {
  res.status(404).send("Not Found");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Server running on", PORT);
});
