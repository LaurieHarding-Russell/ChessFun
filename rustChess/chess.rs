#![allow(non_snake_case)]

use wasm_bindgen::prelude::*;

// use self::board::Board;

pub mod piece;
use self::piece::Piece;

// pub mod board;
// use crate::board::Board;
// pub mod board;
// use self::piece::Piece;
// use self::chessMove::ChessMove;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_board(a: &JsValue);

}


#[wasm_bindgen]
pub fn isValidMove(side: bool, jsBoard: &JsValue) -> bool {
    log("Hello from Rust!");
    log_board(jsBoard);

    return true;
}