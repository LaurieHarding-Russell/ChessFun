#![allow(non_snake_case)]
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct ChessMove {
    fromX: u8,
    fromY: u8,
    toX: u8,
    toY: u8
}

#[wasm_bindgen]
impl ChessMove {
    #[wasm_bindgen(constructor)]
    pub fn new(fromX: u8,
               fromY: u8,
               toX: u8,
               toY: u8) -> ChessMove {
        ChessMove { fromX, fromY, toX, toY }
    }

    pub fn getFromX(&self) -> String {
        self.fromX
    }

    pub fn getFromY(&self) -> String {
        self.fromY
    }

    pub fn getToX(&self) -> String {
        self.toX
    }

    pub fn getToY(&self) -> String {
        self.toY
    }

}