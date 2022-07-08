require("dotenv").config();
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});
const axios = require("axios");

client.on("ready", () => {
  console.log(`Bot ${client.user.tag} is logged in!`);
});

client.on("messageCreate", async (message) => {
  const getSMS = await sendKavithai();
  if (message.author.bot) {
    return;
  } else if (
    message.content.toLowerCase().includes("tamilsms") ||
    message.content.toLowerCase().includes("kavithai")
  ) {
    message.channel.send(getSMS);
  } else {
    message.channel.send(getSMS);
  }
});

async function sendKavithai() {
  const res = await axios.get(process.env.API_URL);
  return res.data[0].content;
}

client.login(process.env.CLIENT_TOKEN).then(() => {
  client.user.setPresence({
    activities: [{ name: "Tamil Kavithaigal", type: "LISTENING" }],
    status: "online",
  });
});
