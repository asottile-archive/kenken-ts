import * as esbuild from 'esbuild'

let result = await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  target: [
    'es2020',
    'chrome58',
    'firefox57',
    'node12',
    'safari11',
  ],
  minify: true,
  sourcemap: true,
  tsconfig: 'tsconfig.json',
  outdir: 'dist',
})
console.log(result)
