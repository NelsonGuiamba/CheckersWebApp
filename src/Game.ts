import NormalPiece from "./Piece.ts";
import QueenPiece from "./Queen.ts";
type Piece = NormalPiece | QueenPiece;
function newPiece(x: number, y: number, value: number) {
    if (value == 3 || value == 4) return new QueenPiece(x, y, value);
    else return new NormalPiece(x, y, value);
}
export default class Game {
    board: Piece[][];
    activePiece: null | [number, number];
    moves: null | number[][];
    isCapturing: boolean;

    constructor(initial: number[][]) {
        this.board = [];
        for (let i = 0; i < initial.length; i++) {
            let tmp: Piece[] = [];
            for (let j = 0; j < initial.length; j++) {
                tmp.push(newPiece(i, j, initial[i][j]));
            }
            this.board.push(tmp);
        }
        this.activePiece = null;
        this.moves = [];
        this.isCapturing = false;
    }

    getMoves(x: number, y: number, isCapture: boolean) {
        if (this.moves != null) {
            for (let i = 0; i < this.moves.length; i++) {
                const [x, y] = this.moves[i];
                this.board[x][y] = newPiece(x, y, 0);
            }
        }

        // white queen
        this.activePiece = [x, y];
        if (!isCapture) this.moves = this.board[x][y].getMoves(this);
        else this.moves = this.board[x][y].getCapturingMoves(this);
        for (let i = 0; i < this.moves.length; i++) {
            const [x, y, v] = this.moves[i];
            this.board[x][y] = newPiece(x, y, v);
        }
    }

    move(x: number, y: number) {
        if (this.activePiece && this.board[x][y].value == -5) {
            if (this.moves != null) {
                for (let i = 0; i < this.moves.length; i++) {
                    const [x, y] = this.moves[i];
                    this.board[x][y] = newPiece(x, y, 0);
                }
            }
            const [px, py] = this.activePiece;
            let p = this.board[px][py];
            const promotingLine = p.value % 2 == 0 ? 7 : 0;
            p.x = x;
            p.y = y;
            if (p.value < 3 && x == promotingLine)
                p = newPiece(x, y, p.value == 1 ? 3 : 4);
            this.board[x][y] = p;
            this.board[px][py] = newPiece(px, py, 0);
            this.activePiece = null;
            this.moves = null;
        }
    }

    capture(x: number, y: number) {
        if (this.activePiece && this.board[x][y].value == -6) {
            if (this.moves != null) {
                for (let i = 0; i < this.moves.length; i++) {
                    const [x, y] = this.moves[i];
                    this.board[x][y] = newPiece(x, y, 0);
                }
            }
            const [px, py] = this.activePiece;
            // piece to delete
            const [ex, ey] = this.board[px][py].getCapturedPiece(x, y, this);
            let p = this.board[px][py];
            p.x = x;
            p.y = y;
            const promotingLine = p.value % 2 == 0 ? 7 : 0;
            this.board[px][py] = newPiece(px, py, 0);
            this.board[ex][ey] = newPiece(px, py, 0);
            this.board[x][y] = p;

            if (this.board[x][y].canCapture(this)) {
                this.isCapturing = true;
                this.activePiece = [x, y];
            } else {
                this.isCapturing = false;
                this.activePiece = null;
                // avoid promoting when i am only passing the promoting square
                if (p.value < 3 && x == promotingLine)
                    this.board[x][y].value = p.value == 1 ? 3 : 4
            }
            this.moves = null;
        }
    }
    getBoard() {
        let arr: number[][] = [];
        for (let i = 0; i < this.board.length; i++) {
            let tmp: number[] = [];
            for (let j = 0; j < this.board[i].length; j++) {
                let n = this.at(i, j);
                if (n != null) tmp.push(n);
            }
            arr.push(tmp);
        }
        return arr;
    }

    at(x: number, y: number) {
        if (x >= 0 && x < this.board.length) {
            if (this.board[x])
                if (y >= 0 && y < this.board[x].length)
                    return this.board[x][y].value;
        }
        return null;
    }

    canCapture(turn: number) {
        if (this.isCapturing && this.activePiece) {
            const [x, y] = this.activePiece;
            return [this.board[x][y]];
        }
        let pieces: Piece[] = [];
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                let p = this.board[i][j];

                if (p.value % 2 == turn) if (p.canCapture(this)) pieces.push(p);
            }
        }
        return pieces;
    }

    gameStatus(turn: number) {
        const enemy = turn == 0 ? 1 : 0;

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                const p = this.board[i][j];

                if (p.value % 2 == enemy)
                    if (p.getMoves(this).length > 0 || p.canCapture(this)) {
                        return false;
                    }
            }
        }
        return true;
    }
}
