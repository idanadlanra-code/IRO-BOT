const express = require("express");
const app = express();

app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("📩 BODY:", req.body);

  const { from, text } = req.body;

  if (!from || !text) {
    console.log("❌ Missing data");
    return res.status(200).send("ok");
  }

  if (text === "הצטרפות") {
    console.log(`📤 To ${from}: 📍 אזור מגורים`);
  } else {
    console.log(`📤 To ${from}: הודעה אחרת`);
  }

  return res.status(200).send("ok");
});

// חשוב מאוד ל-Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on", PORT);
});
