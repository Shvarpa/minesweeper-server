import { Point } from "../../@types";
import { range } from "../utils";
import { Cell } from "./Cell";

export class Grid {
  rows: number;
  columns: number;
  grid: Cell[][];
  left: number;

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
        this.set({ x, y }, new Cell(x, y));
      }
    }
  }

  *neighbours(point: Point) {
    for (let x of [point.x - 1, point.x, point.x + 1]) {
      for (let y of [point.y - 1, point.y, point.y + 1]) {
        if (0 <= x && x < this.columns && 0 <= y && y < this.rows && !(x == point.x && y == point.y)) {
          yield this.get({ x, y });
        }
      }
    }
  }

  placeBombs(bombs: Point[]) {
    for (let bomb of bombs) {
      let cell = this.get({ x: bomb.x, y: bomb.y });
      cell.bomb = true;
      delete cell.number;
      for (let neighbour of this.neighbours(bomb))
        if (typeof neighbour.number != "undefined")
          neighbour.number += 1;
      this.left = (this.rows * this.columns) - bombs.length
    }
  }

  get(point: Point) {
    return this.grid[point.y][point.x];
  }

  set(point: Point, value: Cell) {
    this.grid[point.y][point.x] = value;
  }

  reveal(point): boolean {
    let cell = this.get(point)
    if (!cell.revealed)
      if (cell.bomb) {
        this.revealAll();
        return false;
      }
      else {
        cell.revealed = true;
        this.left -= 1;
        if (cell.number === 0)
          for (let neighbour of this.neighbours(cell)) {
            if (!neighbour.bomb)
              this.left -= 1;
              if (neighbour.number === 0)
                this.reveal(neighbour);
              else neighbour.revealed = true;
          }
        return true;
      }
    return true;
  }

  flag(point:Point){
    let cell = this.get(point)
    cell.flag != cell.flag;
  }

  revealAll() {
    for (let row of this.grid) {
      for (let cell of row) {
        cell.revealed = true;
      }
    }
  }

  toHtml() {
    // return `${this.grid.map(row => "<p>" + row.map(cell => typeof cell.number != "undefined" ? cell.number : "x").join(" , ") + "</p>\n").join("")}`;
    // return `${this.grid.map(row=>"<p>"+row.map(cell=>`(${cell.x},${cell.y})`).join(',')+"</p>\n").join("")}`
    return `${this.grid.map(row => "<p>" + row.map(cell => cell.revealed ? (typeof cell.number != "undefined" ? cell.number : "x") : "~").join(" , ") + "</p>\n").join("")}`;
  }
}
