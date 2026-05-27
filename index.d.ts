export declare const runtimeEdgeList: readonly ["cloudflare", "vercel", "edge-general"];
/**
 * Javascript edge/serverless runtime list, as a Typescript type
 * @since 0.4.0
 */
export type RuntimeEdgeType = typeof runtimeEdgeList[number];
/**
 * Javascript standard runtime list
 * @since 0.4.0
 */
export declare const runtimeStandardList: readonly ["jx", "node", "deno", "bun", "iojs", "browser", "jsdom", "webworker"];
/**
 * Javascript standard runtime list, as a Typescript type
 * @since 0.4.0
 */
export type RuntimeStandardType = typeof runtimeStandardList[number];
/**
 * All Javascript runtime list
 * @since 0.4.0
 */
export declare const runtimeList: readonly ["jx", "node", "deno", "bun", "iojs", "browser", "jsdom", "webworker", "cloudflare", "vercel", "edge-general"];
/**
 * All Javascript runtime list, as a Typescript type
 * @since 0.4.0
 */
export type RuntimeType = RuntimeStandardType & RuntimeEdgeType;
/**
 * All known Javascript engine list
 * @since 0.4.0
 */
export declare const engineList: readonly ["v8", "chakra", "spidermonkey", "javascriptCore"];
/**
 * All known Javascript engine list, as a Typescript type
 * @since 0.4.0
 */
export type EngineType = typeof engineList[number];
/**
 * List of sub-function (```isEdge```, ```isStandard```, etc) inside of the {@link runtime} function
 * @since 0.4.0
 */
type FnRuntime = {
    /**
     * Detect the Javascript runtime
     * @since 0.4.0
     */
    (): RuntimeType | undefined;
    /**
     * Detect if the Javascript runtime was in edge/serverless
     * @since 0.4.0
     */
    isEdge: () => boolean;
    /**
     * Detect if the Javascript runtime was in non-edge/standard runtime
     *
     * If you want to detect both non-edge and edge runtime, call the main {@link runtime} function instead
     * @since 0.4.0
     */
    isStandard: () => boolean;
};
/**
 * Detect the Javascript runtime
 * @since 0.4.0
 */
export declare const runtime: FnRuntime;
/**
 * Detect the Javascript engine. Such as ```v8```, and more
 * @since 0.1.3
 */
export declare function engine(): EngineType | undefined;
export {};
//# sourceMappingURL=index.d.ts.map