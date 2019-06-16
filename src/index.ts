import express = require("express");
import { MinesweeperGame } from "./modules/MinesweeperGame";
const app = express();
const port = 3000;

let game = new MinesweeperGame(30,30)
game.generateGame();
app.get("/", (req, res) => {
  res.send(game.grid.toHtml());
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
