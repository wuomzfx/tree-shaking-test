const babel = require('babel-core')
const { RawSource } = require('webpack-sources')
const RequestShortener = require('webpack/lib/RequestShortener')

module.exports = class BabelPlugin {
  constructor () {
    this.options = {
      sourceRoot: process.cwd(),
      sourceMap: false
    }
  }
  apply (compiler) {
    console.log('This is an example plugin!!!')
    compiler.plugin('compilation', compilation => {
      // 现在设置回调来访问编译中的步骤：
      const requestShortener = new RequestShortener(compiler.context)
      compilation.plugin('optimize', function () {
        console.log('Assets are being optimized.')
      })
      compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
        console.log('===============optimize-chunk-assets====================')
        chunks
          .reduce((acc, chunk) => acc.concat(chunk.files || []), [])
          .concat(compilation.additionalChunkAssets || [])
          .forEach(file => {
            try {
              const asset = compilation.assets[file]
              const input = asset.source()
              const outputSource = babel.transform(input, {
                inputSourceMap: undefined,
                sourceRoot: 'C:\\xampp\\htdocs\\tree-shaking-test',
                filename: file,
                sourceMap: false
              }).code
              compilation.assets[file] = new RawSource(outputSource)
            } catch (error) {
              compilation.errors.push(BabelPlugin.buildError(error, file, null, requestShortener))
            }

            // console.log(input)
            // console.log('===============optimize-chunk-assets====================')
            console.log(file)
          })
        console.log('===============optimize-chunk-assets====================')
        callback()
      })
    })
  }
  static buildError (err, file, sourceMap, requestShortener) {
    // Handling error which should have line, col, filename and message
    if (err.line) {
      const original = sourceMap && sourceMap.originalPositionFor({
        line: err.line,
        column: err.col
      })
      if (original && original.source) {
        return new Error(`${file} from BabelLoder\n${err.message} [${requestShortener.shorten(original.source)}:${original.line},${original.column}][${file}:${err.line},${err.col}]`)
      }
      return new Error(`${file} from BabelLoder\n${err.message} [${file}:${err.line},${err.col}]`)
    } else if (err.stack) {
      return new Error(`${file} from BabelLoder\n${err.stack}`)
    }
    return new Error(`${file} from BabelLoder\n${err.message}`)
  }
}
