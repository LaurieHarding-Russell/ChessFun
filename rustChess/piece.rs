#![allow(non_snake_case)]
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Piece {
    pieceType: String,
    side: bool,
}

#[wasm_bindgen]
impl Piece {
    #[wasm_bindgen(constructor)]
    pub fn new(pieceType: String, side: bool) -> Piece {
        Piece { pieceType, side }
    }
}

// #[derive(Debug, PartialEq)]
// enum PieceType {
//     POND,
//     ROOK,
//     KNIGHT,
//     BISHOP,
//     QUEEN,
//     KING
// }
//
// impl FromStr for PieceType {
//
//     type Err = ();
//
//     fn from_str(input: &str) -> Result<Foo, Self::Err> {
//         match input {
//             "POND"  => Ok(PieceType::POND),
//             "ROOK"  => Ok(PieceType::ROOK),
//             "KNIGHT"  => Ok(PieceType::KNIGHT),
//             "BISHOP"  => Ok(PieceType::BISHOP),
//             "QUEEN"  => Ok(PieceType::QUEEN),
//             "KING"  => Ok(PieceType::KING),
//             _      => Err(()),
//         }
//     }
// }