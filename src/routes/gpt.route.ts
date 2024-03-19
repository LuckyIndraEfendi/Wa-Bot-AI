import { Message } from "whatsapp-web.js";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.APIKEY,
  });

export default async (Client: Message, Msg: RegExpMatchArray | null) => {
    const param = Msg?.[1] || "Hai";
    Client.reply("GPT AI Sedang Menjawab...");
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: param }],
    });
    return Client.reply(
        response.choices[0].message.content ?? "Empty response"
    );
}