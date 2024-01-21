export enum PieceType {
    POND = 'POND',
    ROOK = 'ROOK',
    KNIGHT = 'KNIGHT',
    BISHOP = 'BISHOP',
    QUEEN = 'QUEEN',
    KING = 'KING'
}

export enum Side {
    BLACK, 
    WHITE
}

// Think about this. 4 sided chess? duck chess?
// How flexable do I want to make this?
export class Piece {
    type: PieceType;
    side: Side;

    constructor(type: PieceType, side: Side) {
        this.type = type;
        this.side = side;
    }
}

export interface ChessMove {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    fromPeice: Piece | null;
    toPeice: Piece | null;
}