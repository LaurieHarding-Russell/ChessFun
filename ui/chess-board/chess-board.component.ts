import { generatePiecesFromString } from "./chess.util";
import { Piece, PieceType, Side, ChessMove } from "./types";

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

    makeMove(move: ChessMove): void {
        if (this.isValidMove()) {
            this.board[move.toY][move.toX] = this.board[move.fromY][move.fromX];
            this.board[move.fromY][move.fromX] = null;
        }
        this.renderBoard();
    }

    loadPgn(): void {
        throw "unimplemented";
    }

    loadFEN(): void {
        throw "unimplemented";
    }

    private isValidMove(): boolean {
        // FIXME, rust web assembly?
        return true;
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
        linkMyCss.setAttribute('href', 'chess-board.component.css');
        this.shadowRoot!.append(style, this.host, linkMyCss);

        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        this.shadowRoot!.append(style, this.host, linkElem);
    }
    
    private createColoumnElement(x: number, y: number): HTMLSpanElement {
        let col = document.createElement('span');
        col.setAttribute('data-x', x.toString());
        col.setAttribute('data-y', y.toString());
        if ((y + x) % 2 == 0) {
            col.setAttribute('class', "white");
        } else {
            col.setAttribute('class', "black");
        }

        if(this.board[y][x] == null) {                    
            return col;
        }

        let img = this.createPeiceElement(x,y);
        col.append(img);
        return col;
    }

    private createPeiceElement(x: number, y: number) {
        let img: HTMLImageElement = document.createElement('img');

        if (this.board[y][x]!.side == Side.WHITE) {
            img.setAttribute('data-side', "white");
        } else {
            img.setAttribute('data-side', "black");
        }

        img.setAttribute('draggable', "true");
        img.setAttribute('data-x', x.toString());
        img.setAttribute('data-y', y.toString());
        switch(this.board[y][x]!.type) {
            case PieceType.POND:
                img.setAttribute('src', "resources/pond.svg");
                img.setAttribute('alt', "pond");
                break;
            case PieceType.KING:
                img.setAttribute('src', "resources/king.svg");
                img.setAttribute('alt', "king");
                break;
            case PieceType.QUEEN:
                img.setAttribute('src', "resources/queen.svg");
                img.setAttribute('alt', "queen");
                break;
            case PieceType.BISHOP:
                img.setAttribute('src', "resources/bishop.svg");
                img.setAttribute('alt', "bishop");
                break;
            case PieceType.KNIGHT:
                img.setAttribute('src', "resources/knight.svg");
                img.setAttribute('alt', "knight");
                break;
            case PieceType.ROOK:
                img.setAttribute('src', "resources/rook.svg");
                img.setAttribute('alt', "rook");
                break;
            default:
                throw "unsupported type";
        }
        img.ondragend = ((event: DragEvent) => {
            let targetElement: HTMLElement = this.shadowRoot!.elementFromPoint(event.clientX, event.clientY) as HTMLElement;
            if (!targetElement || !targetElement.dataset.x || !targetElement.dataset.y) {
                throw "Not on board";
            }
            this.makeMove({
                fromX: +(img.dataset.x as string),
                fromY: +(img.dataset.y as string),
                toX: +targetElement.dataset.x,
                toY: +targetElement.dataset.y
            });
        })
        return img;
    }
}

