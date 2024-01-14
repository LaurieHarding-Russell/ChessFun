import { generatePiecesFromString } from "./chess.util";
import { Piece, PieceType, Side } from "./types";

export class ChessBoard extends HTMLElement {
    board: Array<Array<Piece|null>> = [];

    host = document.createElement('div');

    constructor() {
        super();
        
        // to shadowDom or not to shadowDom...
        let shadow = this.attachShadow({mode: 'open'});

        this.host.setAttribute('class','board');

        this.createStandardBoard();
        this.setStyle();
        this.renderBoard(); // FIXME, think about what should call this.
    }

    renderBoard() {
        this.host.innerHTML = "";
        for (let y = 0; y != this.board.length; y++) {
            const row = document.createElement('div');
            row.setAttribute('data-row', `${y}`);
            row.setAttribute('class', "row");
            for (let x = 0; x!= this.board[y].length; x++) {
                const col = this.createColoumnElement(x, y);
                row.append(col);
            }
            this.host.append(row);
        }
    }

    back(): void {
        throw "unimplemented";
    }

    forward(): void {
        throw "unimplemented";
    }

    makeMove(): void {
        throw "unimplemented";
    }

    loadPgn(): void {
        throw "unimplemented";
    }

    loadFEN(): void {
        throw "unimplemented";
    }

    // FIX ME, look at existing notation like EPD PGN FEN.
    private createStandardBoard() {
        // FIXME, is there a better way? lol empty white side... multiple line support?
        this.board.push(generatePiecesFromString(Side.WHITE, "RNBQKBNR"));
        this.board.push(generatePiecesFromString(Side.WHITE, "PPPPPPPP"));
        this.board.push(generatePiecesFromString(Side.WHITE, "        "));
        this.board.push(generatePiecesFromString(Side.WHITE, "        "));
        this.board.push(generatePiecesFromString(Side.BLACK, "        "));
        this.board.push(generatePiecesFromString(Side.BLACK, "        "));
        this.board.push(generatePiecesFromString(Side.BLACK, "PPPPPPPP"));
        this.board.push(generatePiecesFromString(Side.BLACK, "RNBQKBNR"));
    }


    private setStyle(): void {
        const style = document.createElement('style');

        const linkMyCss = document.createElement('link');
        linkMyCss.setAttribute('rel', 'stylesheet');
        linkMyCss.setAttribute('href', 'chess-board.css');
        this.shadowRoot!.append(style, this.host, linkMyCss);

        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        this.shadowRoot!.append(style, this.host, linkElem);
    }
    
    private createColoumnElement(x: number, y: number): HTMLSpanElement {
        let col = document.createElement('span');
                col.setAttribute('data-col', `${x}`);
                if ((y + x) % 2 == 0) {
                    col.setAttribute('class', "white");
                } else {
                    col.setAttribute('class', "black");
                }

                if(this.board[y][x] == null) {                    
                    return col;
                }
                if (this.board[y][x]!.side == Side.WHITE) {
                    col.setAttribute('data-side', "white");
                } else {
                    col.setAttribute('data-side', "black");
                }
                switch(this.board[y][x]!.type) {
                    case PieceType.POND:
                        col.innerHTML=`<img src="resources/pond.svg" alt="pond">`;
                        break;
                    case PieceType.KING:
                        col.innerHTML=`<img src="resources/king.svg" alt="king">`;
                        break;
                    case PieceType.QUEEN:
                        col.innerHTML=`<img src="resources/queen.svg" alt="queen">`;
                        break;
                    case PieceType.BISHOP:
                        col.innerHTML=`<img src="resources/bishop.svg" alt="bishop">`;
                        break;
                    case PieceType.KNIGHT:
                        col.innerHTML=`<img src="resources/knight.svg" alt="knight">`;
                        break;
                    case PieceType.ROOK:
                        col.innerHTML=`<img src="resources/rook.svg" alt="rook">`;
                        break;
                    default:
                        throw "unsupported type";
                }
        return col;
    }
}

