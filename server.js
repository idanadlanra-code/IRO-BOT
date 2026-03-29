const express = require("express");
const app = express();

app.use(express.json());

// בדיקה פשוטה
app.get("/", (req, res) => {
  return res.status(200).send("Server is alive");
});

// webhook
app.post("/webhook", (req, res) => {
  console.log("📩 BODY:", req.body);

  return res.status(200).json({ success: true });
});

// fallback לכל מצב
app.use((req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on", PORT);
});
