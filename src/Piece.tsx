import WhitePiece from "./assets/black piece.png";
import BlackPiece from "./assets/white piece.png";
import WhiteKing from "./assets/black king.png";
import BlackKing from "./assets/white king.png";

type PieceProps = {
    type: number;
    bgColor: string;
    handleClick: () => void;
};

export default function Piece({ type, bgColor, handleClick }: PieceProps) {
    if (type < 0) bgColor += " highlighted";
    if (type == 0 || type == -5 || type == -6) return <div className={bgColor} onClick={handleClick}></div>;
    let img = "";
    if (type == 1) img = BlackPiece;
    else if (type == 3) img = BlackKing;
    else if (type == 2) img = WhitePiece;
    else if (type == 4) img = WhiteKing;

    return (
        <div className={bgColor} onClick={handleClick}>
            <img src={img}></img>
        </div>
    );
}
