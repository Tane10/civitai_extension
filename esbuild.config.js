const esbuild = require("esbuild");
const path = require("path");

const build = () => {
  try {
    esbuild
      .build({
        entryPoints: ["./src/background.ts", "./src/content.ts"],
        bundle: true,
        minify: true,
        sourcemap: true,
        outdir: path.resolve(__dirname, "dist"),
        platform: "node",
        loader: {
          ".png": "file", // Example loader for images if needed
        },
      })
      .catch(() => process.exit(1));
  } catch (err) {
    console.error(err);
  }
};

build();
