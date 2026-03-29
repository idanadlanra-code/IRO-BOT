const express = require("express");
const app = express();

app.use(express.json());

let users = {};

function sendMessage(to, message) {
  console.log(`📤 To ${to}: ${message}`);
}

app.post("/webhook", (req, res) => {
  const from = req.body.from;
  const text = req.body.text;

  if (!users[from]) {
    users[from] = { step: "start", data: {} };
  }

  let user = users[from];

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

  else if (user.step === "region") {
    const regions = ["דרום","מרכז","צפון","ירושלים","איו\"ש"];
    const choice = parseInt(text);

    if (!choice || choice < 1 || choice > 5) {
      sendMessage(from, "שלח מספר תקין");
      return res.sendStatus(200);
    }

    user.data.region = regions[choice - 1];
    user.step = "trucks";

    sendMessage(from, "🚚 כמה משאיות יש לך? (מספר בלבד)");
  }

  else if (user.step === "trucks") {
    user.data.trucks = text;
    user.step = "name";

    sendMessage(from, "✍️ מה השם שלך?");
  }

  else if (user.step === "name") {
    user.data.name = text;
    user.step = "done";

    sendMessage(from, "✅ נרשמת בהצלחה");
    console.log("USER DATA:", user.data);
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));
