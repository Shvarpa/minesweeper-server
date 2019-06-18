import { Game } from "./modules/Minesweeper/Game"

import sio = require('socket.io')
import express = require('express')
import httpServer = require('http')
import { Host } from "./modules/Minesweeper/Host";


const app = express();
const http = httpServer.createServer(app);
const io = sio(http);
const port = 3000;

let host = new Host(io)

http.listen(port, () => console.log(`http listening on port ${port}! http://localhost:${port}`));
