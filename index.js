import { Apple } from './src/class'
import { multiply } from './src/func'

// import { Apple, multiply } from './dist/rollup-bundle-lib'

// import { components } from './dist/webpack-bundle-lib'
// const { Apple, multiply } = components

new Apple({
  model: 'IPhone' + multiply(2, 4)
})
