// rollup.config.js

import html from '@rollup/plugin-html';
import css from 'rollup-plugin-css-only';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { visualizer } from 'rollup-plugin-visualizer';
import analyze from 'rollup-plugin-analyzer';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import fs from 'fs';

// Common plugins (excluding TypeScript)
const commonPlugins = [
  resolve(),
  commonjs(),
  analyze({ summaryOnly: true }),
];

export default [
  // **Browser Build**
  {
    input: './src/index.ts', // Single entry point for browser
    output: {
      file: 'dist/bundle.js',      // Output to dist/
      format: 'iife',               // IIFE format for browsers
      sourcemap: true,
      inlineDynamicImports: true,   // Prevents code-splitting for IIFE
    },
    plugins: [
      html({
        fileName: 'index.html',
        template: () => fs.readFileSync(path.resolve(__dirname, 'src/index.html'), 'utf8'),
      }),
      css({ output: 'bundle.css' }), // Outputs to dist/bundle.css
      ...commonPlugins,
      // TypeScript plugin with declarations disabled for browser build
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false, // Disable declaration files for browser build
      }),
      terser(), // Minify the bundle
      visualizer({
        filename: 'dist/bundle-stats.html',
        open: true, // Automatically open the visualization in the browser
      }),
    ],
  },
  
  // **CommonJS (CJS) Build**
  {
    input: ['./src/index.ts', './src/another.ts'], // Multiple entry points for CJS
    external: ['lodash'],                           // External dependencies
    output: {
      dir: 'dist/cjs',              // Output directory for CJS
      format: 'cjs',                // CommonJS format
      sourcemap: true,
      preserveModules: true,        // Enables code-splitting
    },
    plugins: [
      ...commonPlugins,
      // TypeScript plugin with declarations enabled for CJS build
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,                      // Enable declaration files
        declarationDir: './dist/cjs/types',     // Output directory for type declarations
      }),
      terser(), // Minify the bundle
    ],
  },
  
  // **ES Module (ESM) Build**
  {
    input: ['./src/index.ts', './src/another.ts'], // Multiple entry points for ESM
    external: ['lodash'],                           // External dependencies
    output: {
      dir: 'dist/esm',              // Output directory for ESM
      format: 'esm',                // ES Module format
      sourcemap: true,
      // No 'preserveModules' needed here unless desired
    },
    plugins: [
      ...commonPlugins,
      // TypeScript plugin with declarations enabled for ESM build
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,                      // Enable declaration files
        declarationDir: './dist/esm/types',     // Output directory for type declarations
      }),
      terser(), // Minify the bundle
    ],
  },
];