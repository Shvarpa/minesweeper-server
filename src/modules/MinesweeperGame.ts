import { range, popRandom, cross, genFilter, genMap } from "./utils";

interface Point {
  x: number;
  y: number;
}

interface Cell {
  reveal: boolean;
  number: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; //9 says it is bomb;
}

export class MinesweeperGame {
  rows: number;
  columns: number;
  grid: Array<Array<Cell>>;

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
  }

  generateGrid() {
    let grid: Array<Array<Cell>> = new Array(this.columns);
    for (let x of range(this.columns)) {
      grid[x] = new Array(this.rows);
      for (let y of range(this.rows)) {
        grid[x][y] = <Cell>{
          reveal: false,
          number: 0
        };
      }
    }
    return grid;
  }

  generateBombs(bombCount: number, start?: Point): Point[] {
    let grid = cross(range(this.columns), range(this.rows));
    let bombGen = genMap(grid, point => {
      return <Point>{
        x: point[0],
        y: point[1]
      };
    });
    bombGen = start
      ? genFilter(bombGen, point => !(point.x == start.x && point.y == start.y))
      : bombGen;
    let bombLocations = [...bombGen];
    while (bombLocations.length > bombCount) {
      popRandom(bombLocations);
    }
    return bombLocations;
  }

  placeBombsOnGrid(grid, bombs) {
    for (let bomb of bombs) {
      grid[bomb.x][bomb.y];
    }
  }

  generateGame(start?: Point) {
    this.grid = this.generateGrid();
    let bombCount = Math.floor((this.rows * this.columns) / 3);
    let bombs = this.generateBombs(bombCount, start);
  }
}
