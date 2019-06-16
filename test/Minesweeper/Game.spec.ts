import { assert, expect } from "chai";

import { Game } from "../../src/modules/Minesweeper/Game";

describe("MinesweeperGame", () => {
  describe("#generateBombs()", () => {
    it("generateBombs(10) should assign 10 bomb locations", () => {
      let game = new Game(5, 5);
      let bombs = game.generateBombs(10);

      expect(bombs.length).to.be.equal(10);
    });

    it("should generate full grid of bombs and filter out starting position", () => {
      let game = new Game(5, 5);
      let start = { x: 2, y: 2 };
      let bombs = game.generateBombs(50, start);

      expect(bombs.length).to.be.equal(24);

      let bombsPlacedOnStart = bombs.filter(
        bomb => bomb.x == start.x && bomb.y == start.y
      );

      expect(bombsPlacedOnStart.length).to.be.equal(0);
    });
  });
});
