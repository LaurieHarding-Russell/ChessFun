"use strict";

import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as assert from 'assert';
// import {isValidMove} from "./chessLibraryWasm.js";
import pkg from './chessLibraryWasm.js';
const {isValidMove} = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wasm_file = path.join(
    __dirname,
    "chessLibraryWasm_bg.wasm"
);
console.log("wasm_file", wasm_file);
const buf = fs.readFileSync(wasm_file);
assert.ok(buf);

console.log("buf", buf);

// let board = new Board([[]])
let side = true;

assert.strictEqual(isValidMove(side, [[]]), true, "invalid move was valid")
// assert.strictEqual(isValidMove(side), true, "valid move was valid")

// WebAssembly.instantiate(buf).then(res => {
//     assert.ok(res);
//     assert.strictEqual(res.instance.exports.isValidMove(), true);
// });