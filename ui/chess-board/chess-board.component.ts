import { generatePiecesFromString } from "./chess.util";
import { Piece, PieceType, Side, ChessMove } from "./types";

// fixme, npm package so that the ide has a fighting chance? ln -s bazel-bin/node_modules node_modules
import {isValidMove, initSync} from "@chess/chessLibraryWasm";

export class ChessBoard extends HTMLElement {
    private board: Array<Array<Piece|null>> = [];
    private moves: Array<ChessMove> = [];
    private host: HTMLDivElement = document.createElement('div');

    public moveNumber: number = 0;
    public currentMove: number = 0;

    chessLibrary: any;
    
    loading: Promise<void | Response> | null = null;

    constructor() {
        super();

        // to shadowDom or not to shadowDom...
        let shadow = this.attachShadow({mode: 'open'});
        this.setStyle();
        // this.host.setAttribute('class', "board")
        console.log("this.host.classList", this.host.classList)
        this.host.classList.add('board');
        this.host.classList.add('loading');

        this.loading = fetch("./node_modules/@chess/chessLibraryWasm_bg.wasm")
                .then((response) => response.arrayBuffer())
                .then((bytes) => {
                    initSync(bytes);
                    this.initialize();
                });
    }

    private initialize() {
        this.host.classList.remove('loading');
        this.createStandardBoard();
        this.renderBoard(); // FIXME, think about what should call this.
    }

    public back(): void {
        if (this.currentMove < 1) {
            return;
        }
        this.currentMove = this.currentMove - 1;
        let move = this.moves[this.currentMove];
        this.board[move.toY][move.toX] = move.toPeice;
        this.board[move.fromY][move.fromX] = move.fromPeice;
        this.renderBoard();
    }

    public forward(): void {
        if (this.currentMove == this.moveNumber) {
            return;
        }
        let move = this.moves[this.currentMove];
        this.moveForward(move);
        this.renderBoard();
    }

    public makeMove(move: ChessMove): void {
        if (isValidMove(true, null)) {
            this.moveForward(move);
            this.moveNumber = this.currentMove;
        }
        this.renderBoard();
    }

    public loadPgn(): void {
        throw "unimplemented";
    }

    public exportPgn(): void {
        throw "unimplemented";
    }

    public loadFEN(): void {
        throw "unimplemented";
    }

    public exportFEN(): void {
        throw "unimplemented";
    }

    private moveForward(move: ChessMove) {
        this.board[move.toY][move.toX] = move.fromPeice;
        this.board[move.fromY][move.fromX] = null;
        this.moves[this.currentMove] = move;
        this.currentMove = this.currentMove + 1;
    }

    private renderBoard() {
        this.host.innerHTML = "";
        for (let y = 0; y != this.board.length; y++) {
            const row = document.createElement('div');
            row.setAttribute('class', "row");
            for (let x = 0; x!= this.board[y].length; x++) {
                const col = this.createColoumnElement(x, y);
                row.append(col);
            }
            this.host.append(row)
        }
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

    private createPeiceElement(x: number, y: number): HTMLImageElement {
        let img: HTMLImageElement = document.createElement('img');
        img.setAttribute('draggable', "true");
        img.setAttribute('data-x', x.toString());
        img.setAttribute('data-y', y.toString());
        
        if (this.board[y][x]!.side == Side.WHITE) {
            img.setAttribute('data-side', "white");
        } else {
            img.setAttribute('data-side', "black");
        }

        this.setPieceElementImage(img, x, y);
        img.ondragend = this.moveHandler;
        return img;
    }

    setPieceElementImage(img: HTMLImageElement, x: number, y: number): void {
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
    }

    private moveHandler = ((event: DragEvent) => {
        let targetElement: HTMLElement = this.shadowRoot!.elementFromPoint(event.clientX, event.clientY) as HTMLElement;
        if (!targetElement || !targetElement.dataset.x || !targetElement.dataset.y) {
            throw "Not on board";
        }
        let fromX = +((event.target as HTMLImageElement).dataset.x as string);
        let fromY = +((event.target as HTMLImageElement).dataset.y as string);
        let toX = +(targetElement.dataset.x as string);
        let toY = +(targetElement.dataset.y as string);
        this.makeMove({
            fromX: fromX,
            fromY: fromY,
            toX: toX,
            toY: toY,
            fromPeice: this.board[fromY][fromX],
            toPeice: this.board[toY][toX]
        });
    })
}

