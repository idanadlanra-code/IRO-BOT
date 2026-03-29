const express = require("express");
const app = express();

app.use(express.json());

// 👇 רק בדיקה — בלי שום דבר נוסף
app.post("/webhook", (req, res) => {
  return res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on", PORT);
});
