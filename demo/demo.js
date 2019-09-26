const bel = require('bel')
const csjs = require('csjs-inject')

const sub = require('..')
// @TODO: link it back into `smartcontract-ui` locally to test

const componentA = require('component-a')

setTimeout(async (state) => { // can overwrite current values BEFORE use or AFTER
  var protocol = sub('mydb', customize)
  const el = demo(protocol)
  document.body.appendChild(el)
  
  function customize () {
    console.error('@TODO: customize')
    // state[x]
    // ...
  }
}, 0, {})
const state = {} 

// ------------ USAGE
function demo (protocol) {
  // Define
  const text0 = protocol('text')
  const formattedText = protocol('formatted-text')
  const class0 = protocol('class')

  // Set Defaults
  text0('foo0')
  class0('.myClass0')

  // Use
  var span
  var el = bel`<div class=${classes.demo}>
    ${span = bel`<span></span>`}
    ${componentA(protocol.sub('A', customizeA))}
  </div>`

  // Listen
  text0(msg => formattedText(msg.body.toUpperCase()))
  formattedText(onText)
  class0(onClass)

  // simulate updates
  setTimeout(randomUpdates, 5000)

  return el

  function onText (msg) { span.textContent = msg.body }
  function onClass (msg) { el.setAttribute('class', msg.body) }
  function randomUpdates () {
    setTimeout(() => {
      text0(`foo${`${Math.random()}`.slice(2)}`)
    }, 1000)
    class0(`.myClass2${`${Math.random()}`.slice(2)}`)
  }
  function customizeA () {
    console.error('@TODO: customizeA')
    // ...
  }
}
const classes = csjs`
.demo {
  border: 2px dotted red;
}`