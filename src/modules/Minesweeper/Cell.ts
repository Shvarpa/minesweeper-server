import { Point } from "../../@types";

export class Cell implements Point {
    x: number;
    y: number;
    reveald: boolean;
    flag: boolean;
    bomb: boolean;
    number?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.reveald = false;
        this.flag = false;
        this.bomb = false;
        this.number = 0;
    }

}