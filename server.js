const express = require("express");
const app = express();

app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("📩 BODY:", req.body);

  const { from, text } = req.body;

  if (text === "הצטרפות") {
    console.log(`📤 To ${from}: אזור מגורים`);
  }

  // 👇 הכי חשוב — להחזיר מיד תשובה
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on", PORT);
});
