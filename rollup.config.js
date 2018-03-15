import json from 'rollup-plugin-json';
import node from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: './src/main.js',
  output: {
    file: './build/gooal-foo.js',
    format: 'umd',
    name: 'gooal',
    path: {
      d3: './node_modules/d3/build/d3.js'
    }
  },
  plugins: [json(), node(), commonjs()]
};