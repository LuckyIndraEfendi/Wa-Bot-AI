import { Client } from "whatsapp-web.js";
import gptRoute from "./gpt.route";
import hercaRoute from "./herca.route";
import ainaRoute from "./aina.route";

export default async (client: Client) => {
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
            return await gptRoute(message, gptMessage);
        }
        const luckyMessage = message.body.match(/#ai-lucky\s+(.+)/);
        if (luckyMessage) {
            return await hercaRoute(message, luckyMessage);
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
            return await ainaRoute(message, param);
        }
    });
};
