[![MIT license](https://img.shields.io/github/license/linusified/isjsruntime)](LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/linusified/isjsruntime)](https://github.com/linusified/isjsruntime/issues)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=eee)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-f9f1e1?logo=bun&logoColor=14151a)](https://bun.sh)

<hr>

Originally sourced from here: https://jsr.io/@linusified/isjsruntime

the npm port (with the same `@linusified/isjsruntime` name) is also official!

The project is licensed under MIT, see [LICENSE](./LICENSE) for details

</hr>

# Isjsruntime

<br>

## Introduction

Contains 4 non-async function (which on fails, return `undefined`), no params needed!

- `runtime()` for detecting a javascript runtime. Has a sub-function (not a `class`)
  - `runtime.isEdge()` to detect if the JS runtime was in edge/serverless
  - `runtime.isStandard()` to detect if the JS runtime was the standard runtime (eg; Node, Deno, Browser, etc)
- `engine()` for detecting a javascript engine

4 Typescript types:

- `EngineType` array of accepted engines such as `v8`, etc.
- `RuntimeType` array of accepted javascript runtimes (packed with `RuntimeStandardType` + `RuntimeEdgeType`)
- `RuntimeStandardType` array of accepted standard javascript runtimes
- `RuntimeEdgeType` array of accepted serverless javascript runtimes

And 4 constant variables equivalent to the Typescript types above:

- `engineList`
- `runtimeList`
- `runtimeStandardList`
- `runtimeEdgeList`

## Setup

This package are universal! Supports JSR (for deno and bun), npm, and even browser!

### Setup npm

Just run this for Node, nothing else and ready to be used!

```sh
npm install @linusified/isjsruntime
```

<br>

If your Deno/Bun project was using some of the nodejs frameworks like vite, svelte, etc, you need to use these commands below.

```sh
# for deno
deno install npm:@linusified/isjsruntime

# for bun
bun add @linusified/isjsruntime
```

Otherwise go to [Setup JSR](###setup-jsr).
JSR supports Typescript (`.ts`) out-of-the-box, so it dosen't need to transpile again to separate `.js`

### Setup JSR

<details>

<summary>If you're using Node, skip this step and go to the "Setup npm" section instead</summary>

JSR already have some beef with those Nodejs frameworks, i don't want you to be stuck at this.

You may be experiencing import problems **ONLY FOR NODEJS FRAMEWORKS**

</details>
Visit https://jsr.io/@linusified/isjsruntime for more info.

On the JSR website (using the link above), see the right pane and pick your environment.
It will show the commands, so you can run and install it asap!

JSR also supports pnpm, yarn, deno, and even bun!

### Setup Browser

Since this package are using ESM, download the [index.js](./index.js) file and use it straight away!
Don't forget to set your `<script>` type as `"module"` when using it

(UMD isn't supported for now)

For example:

- On script.js

```js
import * as js from "/path/to/isjsruntime/index.js";
```

- On your index.html

```html
...
<script src="/path/to/script.js" type="module"></script>
...
```

## Examples

### Detect if running on bun (working with/without polyfill)

```ts
// import the package
import * as js from '@linusified/isjsruntime'
// make a function
function run(){
// check using the runtime() function
const env = js.runtime()
if (env==='bun'){ 
  console.log('you are on bun')
} else {
  throw new Error('it looks like you are using another js enviroment')
}
}
// run the function
run()
```

### Detect if the node engine is running on v8

```ts
import * as js from "@linusified/isjsruntime";

function isusingv8() {
  // check using the engine() function
  const engine = js.engine();
  if (engine === "v8") return true;
  else return false;
}
//print it onto the console
console.log(isusingv8());
```
