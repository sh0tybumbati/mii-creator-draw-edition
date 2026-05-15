import * as sass from "sass";
import type { BuildOutput } from "bun";

async function compile(filePath: string, outputDir: string) {
  const output = (await Bun.build({
    entrypoints: [filePath],
    outdir: outputDir,
    splitting: false,
    emitDCEAnnotations: true,
    sourcemap: "linked",
    minify: { identifiers: true, syntax: true, whitespace: true },
  }).catch((e) => console.error("Failed to build:", e))) as BuildOutput;
  if (output?.logs) {
    for (const log of output.logs) console.error(log);
  }
}

await compile("./src/main.ts", "./public/dist/");
await compile("./src/api.ts", "./public/dist/");

const mainScss = sass.compile("./src/scss/main.scss");
await Bun.write("./public/dist/main.css", mainScss.css);
