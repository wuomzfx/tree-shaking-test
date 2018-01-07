const unlessFunc = param => {
  return 'unless param:' + param.a
}
unlessFunc({ a: 123 })

export default (a, b) => {
  console.log('do multipy')
  return a * b
}
