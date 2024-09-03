const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs");

try {
  esbuild
    .build({
      entryPoints: [
        "./src/background.ts",
        "./src/content.ts",
        "./src/popup.ts",
      ],
      bundle: true,
      minify: true,
      sourcemap: true,
      outdir: path.resolve(__dirname, "dist"),
      loader: {
        ".png": "file", // Example loader for images if needed
      },
    })
    .catch(() => process.exit(1));

  fs.copyFileSync(
    path.resolve(__dirname, "src", "index.html"),
    path.resolve(__dirname, "dist", "index.html")
  );
} catch (err) {
  console.error(err);
}
