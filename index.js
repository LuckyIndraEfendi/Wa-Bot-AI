const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const dotenv = require("dotenv");
dotenv.config();
const qrcode = require("qrcode-terminal");
const express = require("express");
const OpenAI = require("openai");
const ainasepics = require("ainasepics");
const { Hercai } = require("hercai");
const hercaClient = new Hercai();
const openai = new OpenAI({
  apiKey: process.env.APIKEY,
});

const app = express();
const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "local-auth",
  }),
});
client.initialize();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", () => {
  console.log("AUTHENTICATED");
});

client.on("auth_failure", (msg) => {
  console.error("AUTHENTICATION FAILURE", msg);
});

client.on("ready", () => {
  console.log("READY");
});
let currentChatLocation;

client.on("message", async (message) => {
  if (message.body.startsWith("help") || message.body === "#help") {
    return message.reply(`*GUNAKAN PERINTAH INI*\n
- *#ai-lucky* [pesan]
- *#ai-gpt* [pesan]
- *#sticker* [gambar] 
    `);
  }
  const gptMessage = message.body.match(/#ai-gpt\s+(.+)/);
  if (gptMessage) {
    const param = gptMessage?.[1] || "Hai";
    message.reply("GPT AI Sedang Menjawab...");
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: param }],
    });
    return message.reply(response.choices[0].message.content);
  }
  const luckyMessage = message.body.match(/#ai-lucky\s+(.+)/);
  if (luckyMessage) {
    const param = luckyMessage?.[1] || "Hai";
    message.reply("Lucky AI Sedang Menjawab...");
    const response = await hercaClient.question({
      model: "v3",
      content: param,
    });
    return message.reply(response.reply);
  }
  if (message.body.startsWith("#sticker") && message.type === "image") {
    message.reply("Sedang memuat sticker...");
    const media = await message.downloadMedia();
    return await client.sendMessage(message.from, media, {
      sendMediaAsSticker: true,
      stickerAuthor: "Zwickyy",
    });
  }
  const param = message.body.match(/#random-gift\s+(.+)/);
  if (param) {
    const params = param?.[1] || "pat";
    const aina = await ainasepics.get(params);
    const media = await MessageMedia.fromUrl(aina?.url);
    return await client.sendMessage(msg.from, media);
  }
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
