declare namespace Minesweeper {
  interface Point {
    x: number;
    y: number;
  }

  export interface Cell extends Point {
    reveal: boolean;
    flag: boolean;
    bomb: boolean;
    number?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  }
}

export = Minesweeper;
