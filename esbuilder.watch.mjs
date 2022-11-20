import esbuild from "esbuild";

esbuild
  .build({
    outdir: "dist",
    target: ["esnext"],
    bundle: true,
    // minify: true,
    jsxFactory: "h",
    jsxFragment: "createElement",
    entryPoints: ["main.jsx"],
    sourcemap: true,
    watch: true,
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
