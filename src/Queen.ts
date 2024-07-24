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
        console.log('is')
        let moves: number[][] = [];
        // normal piece
        if (this.value == 3 || this.value == 4) {
            const dirs = [1, -1];
            for (const dirX of dirs) {
                for (const dirY of dirs) {
                    for (let i = 1; i <= 7; i++) {
                        if (
                            board.at(this.x + dirX * i, this.y + dirY * i) == 0
                        ) {
                            moves.push([
                                this.x + dirX * i,
                                this.y + dirY * i,
                                -5,
                            ]);
                        } else break;
                    }
                }
            }
        }

        return moves;
    }

    getCapturingMoves(board: Board) {
        let moves: number[][] = [];
        // normal piece
        if (this.value == 3 || this.value == 4) {
            const dirs = [1, -1];
            for (const dirX of dirs) {
                for (const dirY of dirs) {
            let haveEnemy = false;
                    for (let i = 1; i <= 7; i++) {
                        if(!haveEnemy)
                            haveEnemy = this.isEnemy(
                                board.at(this.x + dirX * i, this.y + dirY * i)
                            ) 
                        else
                        if (
                            board.at(
                                this.x + dirX * i,
                                this.y + dirY * i
                            ) == 0
                        ) {
                            moves.push([this.x + dirX * i, this.y + dirY * i, -6]);
                        }
                        else
                            break
                    }
                }
            }
        }

        return moves;
    }

    canCapture(board: Board) {
        // normal piece
        if (this.value == 3 || this.value == 4) {
            const dirs = [1, -1];
            for (const dirX of dirs) {
                for (const dirY of dirs) {
                    for (let i = 1; i <= 7; i++) {
                        if (
                            this.isEnemy(
                                board.at(this.x + dirX * i, this.y + dirY * i)
                            ) &&
                            board.at(
                                this.x + dirX + dirX * i,
                                this.y + dirY + dirY * i
                            ) == 0
                        ) {
                            return true;
                        }
                    }
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

    getCapturedPiece(x: number, y: number, board: Board){
        const dirX = this.x - x > 0 ? -1 : 1
       const dirY = this.y - y > 0 ? -1 : 1
        console.log('Quuen >', this)
        console.log('direction', dirX, '-',dirY)
        for(let i=1;i<7;i++){
            if(this.isEnemy(board.at(this.x + dirX * i,
                             this.y + dirY * i))
              ){
                    if(board.at(x, y) == 0){
                        return [this.x + dirX * i,
                                this.y + dirY * i]
                     }
            }   
        }
        return []
    } 
}
