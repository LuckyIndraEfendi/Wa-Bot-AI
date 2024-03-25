import { Message } from "whatsapp-web.js";
import { Hercai } from "hercai";

const hercaClient = new Hercai();

export default async (Client: Message, message: RegExpMatchArray | null) => {
    const param = message?.[1] || "Hai";
    Client.reply("Lucky AI Sedang Menjawab...");
    const response = await hercaClient.question({
        model: "v3",
        content: param,
    });
    return Client.reply(response.reply);
}