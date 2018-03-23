import json from 'rollup-plugin-json';
import node from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  input: './src/main.js',
  output: {
    file: './build/gooalcharts.js',
    format: 'umd',
    name: 'gooal',
    path: {
      d3: './node_modules/d3/build/d3.js'
    }
  },
  plugins: [json(),
  node(),
  commonjs(),
  babel({ exclude: 'node_modules/**' })
  ]
};