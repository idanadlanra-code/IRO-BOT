const express = require("express");
const app = express();

app.use(express.json());

let users = {};

// פונקציה שמדמה שליחת הודעה
function sendMessage(to, message) {
  console.log(`📤 To ${to}: ${message}`);
}

// webhook
app.post("/webhook", (req, res) => {
  try {
    const from = req.body.from;
    const text = req.body.text;

    console.log("📩 Incoming:", req.body);

    if (!from || !text) {
      console.log("❌ Missing data");
      return res.sendStatus(200);
    }

    if (!users[from]) {
      users[from] = { step: "start", data: {} };
    }

    let user = users[from];

    // התחלה
    if (text === "הצטרפות") {
      user.step = "region";

      sendMessage(from, `📍 אזור מגורים:

1 דרום
2 מרכז
3 צפון
4 ירושלים
5 איו"ש

שלח מספר`);
    }

    // בחירת אזור
    else if (user.step === "region") {
      const regions = ["דרום", "מרכז", "צפון", "ירושלים", "איו\"ש"];
      const choice = parseInt(text);

      if (!choice || choice < 1 || choice > 5) {
        sendMessage(from, "❌ שלח מספר תקין בין 1 ל-5");
      } else {
        user.data.region = regions[choice - 1];
        user.step = "trucks";

        sendMessage(from, "🚚 כמה משאיות יש לך? (מספר בלבד)");
      }
    }

    // מספר משאיות
    else if (user.step === "trucks") {
      user.data.trucks = text;
      user.step = "name";

      sendMessage(from, "✍️ מה השם שלך?");
    }

    // שם
    else if (user.step === "name") {
      user.data.name = text;
      user.step = "done";

      sendMessage(from, "✅ נרשמת בהצלחה");
      console.log("✅ USER DATA:", user.data);
    }

    else {
      sendMessage(from, "👋 שלח 'הצטרפות' כדי להתחיל");
    }

    // ⚠️ הכי חשוב — תמיד להחזיר תשובה
    res.sendStatus(200);

  } catch (err) {
    console.error("🔥 ERROR:", err);
    res.sendStatus(200); // שלא יקרוס
  }
});

// פורט נכון ל-Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🚀 Server running on", PORT));
