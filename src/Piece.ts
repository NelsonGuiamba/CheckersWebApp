import Board from "./Game.ts";

export default class Piece {
    x: number;
    y: number;
    value: number;

    constructor(x: number, y: number, value: number) {
        this.x = x;
        this.y = y;
        this.value = value;
    }

    getMoves(board: Board) {
        let moves: number[][] = [];
        // normal piece
        if (this.value > 0) {
            const dir = this.value == 1 ? -1 : 1;
                if (board.at(this.x + dir, this.y - 1) == 0) {
                    moves.push([this.x + dir, this.y - 1, -5]);
                }
                // capture
                //  enemy are even paieces (2, 4)
                if (board.at(this.x + dir, this.y + 1) == 0) {
                    moves.push([this.x + dir, this.y + 1, -5]);
                }
            }

        return moves;
    }

    getCapturingMoves(board: Board) {
        let moves: number[][] = [];
        // normal piece
        if (this.value == 1 || this.value == 2) {
            for (const dir of [1, -1]) {
                if (
                    this.isEnemy(board.at(this.x + dir, this.y - 1)) &&
                    board.at(this.x + dir + dir, this.y - 2) == 0
                ) {
                    moves.push([this.x + dir + dir, this.y - 2, -6]);
                }
                // capture
                //  enemy are even paieces (2, 4)
                if (
                    this.isEnemy(board.at(this.x + dir, this.y + 1)) &&
                    board.at(this.x + dir + dir, this.y + 2) == 0
                ) {
                    moves.push([this.x + dir + dir, this.y + 2, -6]);
                }
            }
        }
        //  queens

        return moves;
    }

    canCapture(board: Board) {
        if (this.value == 1 || this.value == 2) {
            for (const dir of [1, -1]) {
                if (this.isEnemy(board.at(this.x + dir, this.y - 1))) {
                    if (board.at(this.x + dir + dir, this.y - 2) == 0)
                        return true;
                }
                if (this.isEnemy(board.at(this.x + dir, this.y + 1))) {
                    if (board.at(this.x + dir + dir, this.y + 2) == 0)
                        return true;
                }
            }
        }
        return false;
    }


    isEnemy(value: number | null) {
        if (this.value == 1 || this.value == 3) return value == 2 || value == 4;
        else if (this.value == 2 || this.value == 4)
            return value == 1 || value == 3;
        return false;
    }

    getCapturedPiece(x : number, y: number, board: Board){
        return [(x + this.x) / 2,
                (y + this.y) / 2]
    }
}
