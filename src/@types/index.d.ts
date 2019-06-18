import { Cell } from "../modules/Minesweeper/Cell";

declare namespace Minesweeper {
  interface Point {
    x: number;
    y: number;
  }

  interface GameState {
    grid: Cell[][];
    rows: number;
    columns: number;
    // status?: "won" | "lost";
    // remaining: number;
  }

  interface StartRequest {
    rows: number;
    columns: number;
    bombs: number;
    start?: Point;
  }
}

export = Minesweeper;
