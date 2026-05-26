import {build} from "./mod_npm.ts"
await build("0.0.1-alpha.1")
const tsc = new Deno.Command("npm", {
  args: [
    "publish", "--access", "public" , "--tag", "alpha"
     ],
  stdout: "inherit",
  stderr: "inherit",
});
const { code } = await tsc.output();
if (code !== 0) { console.error("test publish failed"); Deno.exit(code); }
console.log("nice! it worked well. now head over to Trusted Publisher on the package's setting in npm");
