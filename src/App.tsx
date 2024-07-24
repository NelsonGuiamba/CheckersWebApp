import Piece from "./Piece.tsx";
import Game from "./Game.ts";
import "./App.css";
import { useState, useRef, useMemo } from "react";
const INITIAL = [
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
];

export default function App() {
    const [board, setBoard] = useState(INITIAL);
    const [turn, setTurn] = useState(1);
    const game = useRef(new Game(INITIAL));
    const gameStatus = useMemo(() => game.current.gameStatus(turn), [board]);

    function handleClick(x: number, y: number) {
        if (gameStatus) return;

        const capturing = game.current.canCapture(turn);

        if (
            capturing.find((p) => p.x == x && p.y == y) ||
            board[x][y] == -6 ||
            (game.current.isCapturing &&
                game.current.activePiece &&
                game.current.activePiece[0] == x &&
                game.current.activePiece[1] == y)
        ) {
            if (board[x][y] != -6) {
                game.current.getMoves(x, y, true);
                setBoard(game.current.getBoard());
            } else {
                game.current.capture(x, y);
                setBoard(game.current.getBoard());
                if (!game.current.gameStatus(turn)) {
                    if (!game.current.isCapturing) setTurn(turn == 1 ? 0 : 1);
                } else {
                    alert(`${playerStyle} won the game`);
                }
            }
        } else if (capturing.length == 0) {
            if (board[x][y] != -5) {
                if (board[x][y] % 2 == turn) {
                    game.current.getMoves(x, y, false);
                    setBoard(game.current.getBoard());
                }
            } else {
                game.current.move(x, y);
                setBoard(game.current.getBoard());
                if (game.current.gameStatus(turn))
                    alert(`${playerStyle} won the game`);
                else setTurn(turn == 1 ? 0 : 1);
            }
        }
    }
    function drawBoard(Board: number[][]) {
        let pieces: React.ReactNode[] = [];
        let bg = "blackSquare";
        const capturing = game.current.canCapture(turn);
        for (let i = 0; i < Board.length; i++) {
            for (let j = 0; j < Board.length; j++) {
                if ((i + 1) % 2 == 1)
                    if ((j + 1) % 2 == 0) bg = "blackSquare";
                    else bg = "whiteSquare";
                else if ((j + 1) % 2 == 1) bg = "blackSquare";
                else bg = "whiteSquare";

                if (
                    !game.current.isCapturing &&
                    capturing.find((p) => p.x == i && p.y == j)
                )
                    bg += " boarded";
                if (
                    game.current.isCapturing &&
                    game.current.activePiece &&
                    game.current.activePiece[0] == i &&
                    game.current.activePiece[1] == j
                )
                    bg += " boarded";
                pieces.push(
                    <Piece
                        type={Board[i][j]}
                        bgColor={bg}
                        handleClick={() => handleClick(i, j)}
                    />
                );
            }
        }
        return pieces;
    }
    const pieces = drawBoard(board);
    const playerName = turn == 0 ? "2" : "1";
    const playerStyle = turn == 0 ? "blackPlayer" : "whitePlayer";

    function resetGame() {
        setBoard(INITIAL);
        game.current = new Game(INITIAL);
    }

    return (
        <>
            <h1>Checkers game</h1>
            {gameStatus ? (
                <div className="gameEnd">
                    <h3>{playerStyle} won the game</h3>
                    <button onClick={() => resetGame()}>New game</button>
                </div>
            ) : (
                <h3 className={playerStyle}>Player {playerName} turn</h3>
            )}
            <div className="board">{...pieces}</div>
        </>
    );
}
