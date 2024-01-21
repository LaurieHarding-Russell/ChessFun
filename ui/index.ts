import { ChessBoard } from "./chess-board/chess-board.component";

customElements.define('chess-board', ChessBoard);



let forward: HTMLButtonElement = document.getElementById("forward") as HTMLButtonElement;
let back: HTMLButtonElement = document.getElementById("back") as HTMLButtonElement;
let board: ChessBoard = document.getElementById("board") as ChessBoard;

forward!.onclick = () => {
    board.forward();
}

back!.onclick = () => {
    board.back();
}