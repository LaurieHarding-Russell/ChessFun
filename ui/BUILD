load("@npm//:defs.bzl", "npm_link_all_packages")
load("@aspect_rules_js//npm:defs.bzl", "npm_link_package")
load("@aspect_rules_ts//ts:defs.bzl", "ts_config")

load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@aspect_rules_js//js:defs.bzl", "js_binary")

exports_files(
    [
        "index.html",
        "chess-board/chess-board.component.css",
        "base.css"
    ],
    visibility = ["//visibility:public"]
)

ts_project(
    name = "app",
    srcs = glob(["**/*.ts"]),
    declaration = True,
    tsconfig = "//:tsconfig",
    deps = [
        "//:node_modules/tslib",
        "//:node_modules/rxjs",
    ],
    visibility = ["//visibility:public"],
)
