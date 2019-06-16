import { Cell, Point } from "../@types";
import { range } from "./utils";
import { threadId } from "worker_threads";

export class MinesweeperGrid {
  rows: number;
  columns: number;
  grid: Cell[][];
  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this.generate();
  }

  generate() {
    this.grid = new Array(this.rows);
    for (let y of range(this.rows)) {
      this.grid[y] = new Array(this.columns);
      for (let x of range(this.columns)) {
        this.set(x, y, <Cell>{
          x,
          y,
          reveal: false,
          flag: false,
          bomb: false,
          number: 0
        });
      }
    }
  }

  *neighbours(point: Point) {
    for (let x of [point.x - 1, point.x, point.x + 1]) {
      for (let y of [point.y - 1, point.y, point.y + 1]) {
        if (0 <= x && x < this.columns && 0 <= y && y < this.rows && !(x == point.x && y == point.y)) {
          yield this.get(x, y);
        }
      }
    }
  }

  placeBombs(bombs: Point[]) {
    for (let bomb of bombs) {
      let cell = this.get(bomb.x, bomb.y);
      cell.bomb = true;
      delete cell.number;
      for (let neighbour of this.neighbours(bomb))
        if (typeof neighbour.number != "undefined")
          neighbour.number += 1;
    }
  }

  get(x: number, y: number) {
    return this.grid[y][x];
  }

  set(x: number, y: number, value: Cell) {
    this.grid[y][x] = value;
  }

  toHtml() {
    return `${this.grid.map(row => "<p>" + row.map(cell => typeof cell.number != "undefined" ? cell.number : "x").join(" , ") + "</p>\n").join("")}`;
    // return `${this.grid.map(row=>"<p>"+row.map(cell=>`(${cell.x},${cell.y})`).join(',')+"</p>\n").join("")}`
  }
}
