app.post("/webhook", (req, res) => {
  // 👇 קודם כל מחזירים תשובה ל-Railway
  res.status(200).send("OK");

  // 👇 רק אחרי זה עושים לוגיקה
  console.log("📩 BODY:", req.body);

  const { from, text } = req.body;

  if (text === "הצטרפות") {
    console.log(`📤 To ${from}: אזור מגורים`);
  }
});
