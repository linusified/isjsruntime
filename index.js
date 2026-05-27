// deno-lint-ignore-file no-process-global no-node-globals
/**
 * Detects Javascript engine and runtime easily!
 * @author linusified
 * @license MIT
 */
/**
 * Javascript edge/serverless runtime list
 * @since 0.4.0
 */
import * as dntShim from "./_dnt.shims.js";
export const runtimeEdgeList = ["cloudflare", "vercel", "edge-general"];
/**
 * Javascript standard runtime list
 * @since 0.4.0
 */
export const runtimeStandardList = [
    "jx",
    "node",
    "deno",
    "bun",
    "iojs",
    "browser",
    "jsdom",
    "webworker",
];
/**
 * All Javascript runtime list
 * @since 0.4.0
 */
export const runtimeList = [...runtimeStandardList, ...runtimeEdgeList];
/**
 * All known Javascript engine list
 * @since 0.4.0
 */
export const engineList = [
    "v8",
    "chakra",
    "spidermonkey",
    "javascriptCore",
];
function isABrowser() {
    try {
        if (typeof process !== "undefined" && process.versions.node !== null) {
            return false;
        }
    }
    catch (_e) { /* intentionally empty */ }
    return true;
}
function g() {
    if (typeof dntShim.dntGlobalThis !== "undefined") {
        return dntShim.dntGlobalThis;
    }
    if (typeof self !== "undefined" &&
        self.constructor.name === "DedicatedWorkerGlobalScope") {
        return self;
    }
    if (typeof dntShim.dntGlobalThis !== "undefined") {
        return dntShim.dntGlobalThis;
    }
    if (typeof global !== "undefined") {
        return global;
    }
}
function proc() {
    // dnt-shim-ignore
    const d = typeof Deno !== "undefined" ? Deno : process;
    return d;
}
/**
 * Detect the Javascript runtime
 * @since 0.4.0
 */
export const runtime = (() => {
    function isGNameNode() {
        const root = g();
        if (typeof root === "undefined") {
            return false;
        }
        try {
            //@ts-ignore: only works for old nodejs rt
            return root.name === "nodejs";
        }
        catch (_) { /*Intentionally empty*/ }
        return false;
    }
    // eslint-disable-next-line no-var
    if (typeof self !== "undefined" &&
        self.constructor.name ===
            "DedicatedWorkerGlobalScope") {
        return "webworker";
    }
    if ((navigator.userAgent.includes("jsdom") ||
        navigator.userAgent.includes("Node.js")) ||
        isGNameNode()) {
        return "jsdom";
    }
    const p = Object.keys(proc().version);
    // dnt-shim-ignore
    if (typeof Deno !== "undefined" && p.includes("deno")) {
        return "deno";
    }
    else if (isABrowser()) {
        return "browser";
    }
    //@ts-ignore: ok
    switch (proc().release.name) {
        case "iojs": {
            return "iojs";
        }
        case "node": {
            return "node";
        }
        default: { /* intentionally empty */ }
    }
    if (p.includes("bun")) {
        return "bun";
    }
    if (
    //@ts-ignore: stop
    typeof proc().jxversion !== "undefined" && typeof jxcore !== "undefined") {
        return "jx";
    }
    return undefined;
});
/**
 * Detect if the Javascript runtime was in edge/serverless
 * @since 0.4.0
 */
runtime.isEdge = function () {
    const rt = runtime();
    if (typeof rt === "undefined") {
        return false;
    }
    return runtimeEdgeList.includes(rt);
};
/**
 * Detect if the Javascript runtime was in non-edge/standard runtime
 *
 * If you want to detect both non-edge and edge runtime, call the main {@link runtime} function instead
 * @since 0.4.0
 */
runtime.isStandard = function () {
    const rt = runtime();
    if (typeof rt === "undefined") {
        return false;
    }
    return runtimeStandardList.includes(rt);
};
/**
 * Detect the Javascript engine. Such as ```v8```, and more
 * @since 0.1.3
 */
export function engine() {
    if (runtime() === "deno" && Object.keys(proc().version).includes("v8")) {
        return "v8";
    }
    //idk how to detect bun's javascriptCore version. But i wanna return it as a fallback for bun
    if (runtime() === "bun") {
        return "javascriptCore";
    }
    //@ts-ignore: stop
    const v = Object.keys(g().versions);
    if (v.includes("v8")) {
        return "v8";
    }
    else if (v.includes("chakra")) {
        return "chakra";
    }
    else if (v.includes("spidermonkey")) {
        return "spidermonkey";
    }
}
