import { Piece, PieceType, Side } from "./types";

// support multiple lines?
export function generatePiecesFromString(side: Side, position: string): Array<Piece|null> {
    let peices:Array<Piece|null> = [];
    for(let letter of position) {
        switch(letter) { 
            case "R":
                peices.push(new Piece(PieceType.ROOK, side));
                break;
            case "N":
                peices.push(new Piece(PieceType.KNIGHT, side));
                break;
            case "B":
                peices.push(new Piece(PieceType.BISHOP, side));
                break;
            case "Q":
                peices.push(new Piece(PieceType.QUEEN, side));
                break;
            case "K":
                peices.push(new Piece(PieceType.KING, side));
                break;
            case "P":
                peices.push(new Piece(PieceType.POND, side));
                break;
            case " ":
                peices.push(null);
                break;
            default:
                throw("unsupported letter");
        }
    }

    return peices
}
