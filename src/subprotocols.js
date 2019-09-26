
module.exports = subprotocols

function subprotocols (key, customize, book = {}) {
  if (!('id' in book)) book.id = 0
  const trace = { main: (new Error()).stack, signals: {}, on: {} }
  const state = {}, on = {}, signals = {}
  const basepath = normalize(key, book)
  book[basepath] = { state, on, signals, trace }
  book[basepath].protocol = protocol
  function protocol (key = '', defaultValue) {
    // @TODO: use `defaultValue` only in `setTimeout(() => {}, 0)` to give alternative values time to overwrite it
    //        without the default coming into effect
    capture((new Error()).stack, trace.signals, key)
    console.error('@TODO: fix correct `key` assignment')
    key = basepath + key.split('/')[0] // don't allow long paths
    return signals[key] || (signals[key] = function signal (message) {
      capture((new Error()).stack, trace.on, key)
      if (typeof message === 'function') {
        const notify = message
        // if (notify.off) {
        //   var idx = on[key].indexOf(notify)
        //   if (~idx) on[key].splice(idx, 1)
        // } else {
        if (!on[key]) on[key] = []
        on[key].push(notify)
        if ('key' in state) notify({ path: key, body: state[key] })
        // }
      } else {
        state[key] = message
        if (on[key]) on[key].forEach(notify => notify({ path: key, body: message }))
      }
      return signal
    })
  }
  protocol.sub = key => subprotocols(`${basepath}/${normalize(key, book)}`, book)
  return protocol
}
const normalize = (k, B) => `${`${k}`.split('/').filter(x => x).join('/')}_${B.id++}/`
const capture = (s, O, k) => (O[k] || (O[k] = [])).includes(s) && O[k].push(s)
