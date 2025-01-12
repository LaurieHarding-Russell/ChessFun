load("@npm//:defs.bzl", "npm_link_all_packages")
load("@aspect_rules_js//npm:defs.bzl", "npm_link_package")
load("@aspect_rules_ts//ts:defs.bzl", "ts_config")

load("@aspect_rules_rollup//rollup:defs.bzl", "rollup")
load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@aspect_rules_js//js:defs.bzl", "js_binary")
load("@bazel_skylib//rules:copy_file.bzl", "copy_file")

# TypeScript and other node programs beneath bazel-bin/examples are able to resolve its location.
npm_link_package(
    name = "node_modules/@chess",
    src = "//rustChess:chess",
    # root_package = "",
    visibility = ["//:__subpackages__"],
)

npm_link_all_packages(name = "node_modules")


ts_config(
    name = "tsconfig",
    src = "tsconfig.json",
    visibility = ["//visibility:public"],
)

js_binary(
    name = "chess",
    entry_point = "server.cjs",
    data = [
        "//:node_modules/express",
        ":bundle",
        ":html",
        ":styles",
        "//resources:wrappedSvgs"
    ]
)

rollup(
    name = "bundle",
    config_file = ":rollup.config.js",
    entry_point = "//ui:index.js",
    node_modules = "//:node_modules",
    sourcemap = "false",
    deps = [
        "//ui:app",
        "//:node_modules/@rollup/plugin-node-resolve"
    ],
)

filegroup(
    name = "styles",
    srcs = [
        "base.css",
        "util.css",
        "chess-board.component.css"
    ],
    visibility = ["//visibility:public"],
)


filegroup(
    name = "html",
    srcs = [
        "index.html",
    ],
    visibility = ["//visibility:public"],
)


copy_file(
    name = "indexHtml",
    src = "//ui:index.html",
    out = "index.html"
)

copy_file(
    name = "baseCss",
    src = "//ui:base.css",
    out = "base.css"
)

copy_file(
    name = "utilCss",
    src = "//ui:util.css",
    out = "util.css"
)

# FIXME, make generic rule for all css file copying.
copy_file(
    name = "chessBoardCss",
    src = "//ui:chess-board/chess-board.component.css",
    out = "chess-board.component.css"
)