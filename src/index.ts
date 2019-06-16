import express = require("express");
import { Game } from "./modules/Minesweeper/Game";
const app = express();
const port = 3000;


app.get("/", (req, res) => {
  let game = new Game(7,7)
  game.generateGame({x:3,y:3});
  res.send(game.grid.toHtml());
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
