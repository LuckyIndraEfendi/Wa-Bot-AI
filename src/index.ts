import { Client, LocalAuth } from "whatsapp-web.js";
import dotenv from "dotenv";
dotenv.config();
import qrcode from "qrcode-terminal";
import express from "express";
import loaders from "./loaders";

const app = express();

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "local-auth",
    }),
});

const StartClient = () => {
    client.on("qr", (qr) => {
        qrcode.generate(qr, { small: true });
    });

    client.on("authenticated", () => {
        console.log("AUTHENTICATED");
    });

    client.on("auth_failure", (msg: string) => {
        console.error("AUTHENTICATION FAILURE", msg);
    });

    client.on("ready", () => {
        console.log("READY");
    });
    client.initialize();
};

const StartServer = () => {
    StartClient();
    loaders(client);
    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });
};

StartServer();
