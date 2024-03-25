import { Message, MessageMedia } from "whatsapp-web.js";
import ainasepics, { AinaseNames } from "ainasepics";

export default async (Client: Message, message: RegExpMatchArray | null) => {
    const params = message?.[1] || "pat";
    const aina = await ainasepics.get(params as AinaseNames);
    const media = await MessageMedia.fromUrl(aina?.url);
    return await Client.reply(media);
};
