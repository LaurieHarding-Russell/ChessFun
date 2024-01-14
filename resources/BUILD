load("@aspect_rules_js//js:defs.bzl", "js_library")

js_library(
    name = "wrappedSvgs",
    data = [":svgs"],
    visibility = ["//visibility:public"],
)

filegroup(
    name = "svgs",
    srcs = [
        "bishop.svg",
        "king.svg",
        "knight.svg", 
        "pond.svg", 
        "queen.svg",
        "rook.svg",
    ]
)