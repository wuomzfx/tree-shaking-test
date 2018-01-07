import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: './index.js',
  output: {
    file: './dist/rollup-bundle.js',
    format: 'es'
  },
  plugins: [
    babel({
      include: 'src/**/*.js'
    }),
    resolve()
  ]
}
