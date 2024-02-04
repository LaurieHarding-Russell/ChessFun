"use strict";

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const wasm_file = path.join(
    __dirname,
    "chessLibraryWasm_bg.wasm",
);
console.log("wasm_file", wasm_file);
const buf = fs.readFileSync(wasm_file);
assert.ok(buf);

console.log("buf", buf);

WebAssembly.instantiate(buf).then(res => {
    assert.ok(res);
    assert.strictEqual(res.instance.exports.isValidMove(), true);
});