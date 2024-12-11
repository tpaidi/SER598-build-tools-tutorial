import html from '@rollup/plugin-html';
import css from 'rollup-plugin-css-only';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import analyze from 'rollup-plugin-analyzer';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import fs from 'fs';

const plugins = [
  html({
    fileName: 'index.html',
    template: () => {
      const htmlPath = path.resolve(__dirname, 'src/index.html');
      return fs.readFileSync(htmlPath, 'utf8');
    },
  }),
  css({ output: 'bundle.css' }),
  terser(),
  resolve(),
  commonjs(),
  analyze({ summaryOnly: true }),
];

export default [
  // CommonJS Build
  {
    input: ['./src/index.ts', './src/another.ts'],
    external: ['lodash'],
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      sourcemap: true,
      preserveModules: true,
    },
    plugins: [
      ...plugins,
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist/cjs/types',
      }),
    ],
  },
  // ES Module Build
  {
    input: ['./src/index.ts', './src/another.ts'],
    external: ['lodash'],
    output: {
      dir: 'dist/esm',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      ...plugins,
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist/esm/types',
      }),
    ],
  },
];