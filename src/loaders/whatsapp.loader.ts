import messageRoute from "src/routes/message.route";
import { Client } from "whatsapp-web.js";

export default (Client: Client) => {
    messageRoute(Client);
};
