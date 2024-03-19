import { Client } from "whatsapp-web.js";
import whatsappLoader from "./whatsapp.loader";

export default (Client: Client) => {
    whatsappLoader(Client);
};
