const esbuild = require("esbuild");
const path = require("path");

const build = () => {
  try {
    esbuild
      .build({
        entryPoints: ["src/index.tsx", "src/background.ts", "src/content.ts"],
        bundle: true,
        minify: true,
        sourcemap: true,
        outdir: path.resolve(__dirname, "dist"),
        platform: "node",
        loader: {
          ".png": "file", // Example loader for images if needed
        },
        define: {
          "process.env.NODE_ENV": JSON.stringify(
            process.env.NODE_ENV || "development"
          ),
        },
      })
      .catch(() => process.exit(1));
  } catch (err) {
    console.error(err);
  }
};

build();
