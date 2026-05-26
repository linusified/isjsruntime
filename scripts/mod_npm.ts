import { build as dntBuild, emptyDir } from "@deno/dnt";

const cwd = Deno.cwd().split("/").pop()!;
const tmpDir = `/tmp/dnt_${cwd}`;

export async function build(overwriteVersion:string|undefined=undefined) {
  await emptyDir(tmpDir);
  let packageJson = JSON.parse(Deno.readTextFileSync("./package.json"))
  if (typeof overwriteVersion !== "undefined") {
    packageJson = {...packageJson, version:overwriteVersion}
    await Deno.writeTextFile("./package.json", packageJson)
  }
  await dntBuild({
    entryPoints: ["./index.ts"],
    outDir: tmpDir,
    shims: { deno: true },
    compilerOptions: {
      lib: ["ES2016", "DOM"],
      target: "ES2017",
    },
    package: packageJson,
    typeCheck: false,
    test: false,
  });

  Deno.copyFileSync(`${tmpDir}/esm/index.js`, "./index.js");
  Deno.copyFileSync(`${tmpDir}/esm/index.d.ts`, "./index.d.ts");
  await Deno.remove(tmpDir, { recursive: true });
}
