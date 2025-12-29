const { App } = require("@slack/bolt");
require("dotenv").config();


const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.message(async ({ message, say }) => {
  // Ignore bot messages
  if (message.subtype === "bot_message" || message.bot_id) return;

  // Log all messages (Events API)
  console.log("New message:", {
    user: message.user,
    text: message.text,
    channel: message.channel,
    ts: message.ts,
  });

  const text = (message.text || "").trim().toLowerCase();

  // Respond only to greetings
  if (["hello", "hi", "hey"].includes(text)) {
    await say(`Hello 👋 <@${message.user}>`);
  }
});

app.command("/hello", async ({ command, ack, respond }) => {
  await ack();
  await respond(`Hello 👋 <@${command.user_id}>`);
});

(async () => {
  await app.start();
  console.log("⚡ Bot is running in Socket Mode");
})();

