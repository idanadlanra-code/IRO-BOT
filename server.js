const express = require("express");
const app = express();

// מאפשר לקרוא JSON מהבקשות
app.use(express.json());

// בדיקה שהשרת עובד
app.get("/", (req, res) => {
  res.status(200).send("Server is alive");
});

// webhook
app.post("/webhook", (req, res) => {
  console.log("📩 BODY:", req.body);

  return res.status(200).json({ success: true });
});

// חשוב מאוד! אין fallback ל-3000
const PORT = process.env.PORT;

// הפעלת השרת
app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on", PORT);
});
