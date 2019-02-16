import { a, change } from './a'

import './style.scss'


document.body.innerHTML += `
  <img src="${require('./apple.jpg')}" />
`

setInterval(() => {
  change()
  console.log(a)
  change()
}, 1000)
