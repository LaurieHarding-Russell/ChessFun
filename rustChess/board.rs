// #![allow(non_snake_case)]
// use wasm_bindgen::prelude::*;
//
// use crate::piece::Piece;
//
// #[wasm_bindgen]
// pub struct Board {
//     board: [[Piece; 8]; 8],
// }
//
// #[wasm_bindgen]
// impl Board {
//     #[wasm_bindgen(constructor)]
//     pub fn new(board: [[Piece; 8]; 8]) -> Board {
//         return Board { board };
//     }
// }