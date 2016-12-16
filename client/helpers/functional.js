const functor = x =>
({
  map: f => functor(f(x)),
  fold: f => f(x)
})


export default { functor }
