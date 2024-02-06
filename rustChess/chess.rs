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
pub fn isValidMove(side: bool, jsBoard: &JsValue) -> bool {
    return true;
}