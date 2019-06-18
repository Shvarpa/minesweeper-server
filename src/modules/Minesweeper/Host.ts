
import sio = require("socket.io")
import { Game } from "./Game";
import { StartRequest, Point, GameState } from "../../@types";

export class Host {

  io: sio.Server
  game: Game

  constructor(io: sio.Server) {
    this.io = io;
    this.configure();
  }

  configure() {
    this.io.on('connection', (socket) => {
      socket.on("start", (data) => { this.startGame(data) });
      socket.on("reveal", (data) => { this.reveal(data) });
    })
  }

  startGame(req: StartRequest) {
    let { rows, columns, bombs, start } = req;
    this.game = new Game(rows, columns);
    this.game.generateGame(bombs, start);
    this.update();
  }

  reveal(data: Point) {
    console.log("revealing point ", data);
    this.game.reveal(data);
    this.update();
  }

  update() {
    console.log("updating");
    this.io.emit("update", { for: "everyone", ...this.game.getState() });
  }

}