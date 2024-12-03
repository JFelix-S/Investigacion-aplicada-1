import dotenv from "dotenv"
import Server from "./models/server";


//? configuracion de variables dotenv
dotenv.config();

const server  = new Server();
server.listen()