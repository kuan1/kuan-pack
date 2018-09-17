import './1.scss'

function test() {
  const div = document.createElement('div')
  div.innerHTML = process.env.NODE_ENV
  document.body.appendChild(div)
}
test()
