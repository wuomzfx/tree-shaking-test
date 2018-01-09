import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: './src/index.js',
  output: {
    file: './dist/rollup-bundle-lib.js',
    format: 'es'
  },
  plugins: [
    babel({
      include: 'src/**/*.*'
    }),
    resolve()
  ]
}
