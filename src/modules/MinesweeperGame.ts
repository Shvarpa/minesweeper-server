import { range, popRandom, cross, genFilter, genMap } from "./utils";
import { Cell, Point } from "../@types";
import { MinesweeperGrid } from "./MinesweeperGrid";

export class MinesweeperGame {
  rows: number;
  columns: number;
  grid: MinesweeperGrid;

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
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


  generateGame(start?: Point) {
    let bombCount = Math.floor((this.rows * this.columns) / 5);
    this.grid = new MinesweeperGrid(this.rows, this.columns)
    let bombs = this.generateBombs(bombCount, start);
    this.grid.placeBombs(bombs);
  }

}
