import { assert, expect } from "chai";

import { Grid } from "../../src/modules/Minesweeper/Grid";

describe("MinesweeperGrid", () => {
  describe("#neighbours()", () => {
    describe("on normal sized grid", () => {
      let rows = 5;
      let columns = 6;
      let grid = new Grid(rows, columns);
      it("show neighbours of different center points", () => {
        let neighbours_of_center = [...grid.neighbours({ x: 2, y: 3 })];
        expect(neighbours_of_center.length).to.be.equal(8);
      });

      it("show neighbours of different corner points", () => {
        let neighbours_of_top_right_corner = [...grid.neighbours({ x: columns - 1, y: 0 })];
        expect(neighbours_of_top_right_corner.length).to.be.equal(3, "top right");

        let neighbours_of_bottom_right_corner = [...grid.neighbours({ x: columns - 1, y: rows - 1 })];
        expect(neighbours_of_bottom_right_corner.length).to.be.equal(3, "bottom right");

        let neighbours_of_bottom_left_corner = [...grid.neighbours({ x: 0, y: rows - 1 })];
        expect(neighbours_of_bottom_left_corner.length).to.be.equal(3, "bottom left");

        let neighbours_of_top_left_corner = [...grid.neighbours({ x: 0, y: 0 })];
        expect(neighbours_of_top_left_corner.length).to.be.equal(3, "top left");
      });

      it("show neighbours of different T corener points", () => {
        let neighbours_of_top = [...grid.neighbours({ x: 1, y: 0 })];
        expect(neighbours_of_top.length).to.be.equal(5);

        let neighbours_of_right = [...grid.neighbours({ x: columns - 1, y: 1 })];
        expect(neighbours_of_right.length).to.be.equal(5);

        let neighbours_of_bottom = [...grid.neighbours({ x: 1, y: rows - 1 })];
        expect(neighbours_of_bottom.length).to.be.equal(5);

        let neighbours_of_left = [...grid.neighbours({ x: 0, y: 1 })];
        expect(neighbours_of_left.length).to.be.equal(5);
      });
    })

    describe("on small grids", ()=>{
      it("1x1",()=>{
        let grid = new Grid(1, 1);
        let neighbours = [...grid.neighbours({ x: 0, y: 0 })];
        expect(neighbours.length).to.be.equal(0);
      })
    })
  });
});
