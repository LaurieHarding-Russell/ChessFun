load("@aspect_rules_js//js:defs.bzl", "js_library", "js_test")
load("@rules_rust//rust:defs.bzl", "rust_binary", "rust_shared_library")
load("@rules_rust//wasm_bindgen/rules_js:defs.bzl", "js_rust_wasm_bindgen")

rust_shared_library(
    name = "chessLibrary",
    srcs = glob(["*.rs"]),
    crate_root = "chess.rs",
    edition = "2018",
    deps = [
        "@rules_rust//wasm_bindgen/3rdparty:wasm_bindgen",
    ],
)

js_rust_wasm_bindgen(
    name = "chessLibraryWasm",
    target = "nodejs",
    wasm_file = ":chessLibrary",
    visibility = ["//visibility:public"],
)

js_test(
    name = "chessJsTest",
    data = [":chessLibraryWasm"],
    entry_point = "chess.test.mjs",
)