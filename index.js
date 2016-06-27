const R     = require('ramda')
const map   = R.map
const clone = R.clone

const log       = (text) => console.log(text)
const stringify = (obj)  => JSON.stringify(obj, true, 4)
const logJSON   = (obj)  => log(stringify(obj))

// =================================
//            CONSTANTS
// =================================

const GPS         = 'GPS'
const LIKE        = 'LIKE'
const LIST_ADD    = 'LIST_ADD'
const LIST_REMOVE = 'LIST_REMOVE'

// =================================
//        ACTIONS / MESSAGES
// =================================

const msgGPS    = (latitude, longitude) => ({type: GPS, latitude, longitude})
const msgLike   = ()                    => ({type: LIKE})
const msgAdd    = (item)                => ({type: LIST_ADD, item})
const msgRemove = (index)               => ({type: LIST_REMOVE, index})

// =================================
//              VIEWS
// =================================

const renderGPS   = (loc)   => log(`Location ${loc.latitude} N/S ${loc.longitude} E/W`)
const renderLikes = (likes) => log(`You have ${likes} likes`)
const renderItems = (items) => map(i => log(`- ${i.text}`), items)
const renderAll   = (state) => {
  renderGPS(store.currentLocation)
  renderLikes(store.likes)
  renderItems(store.items)
}

// =================================
//         DATABASE / STORE
// =================================

let store = {
  currentLocation: {latitude: 30.33, longitude: -127.33},
  likes: 3,
  items: [
    {text:'item 1'},
    {text:'item 2'}
  ]
}

const dispatch = (msg, state) => {
  let newState = clone(state)
  if (msg.type === GPS) {
    newState.currentLocation = {latitude: msg.latitude, longitude: msg.longitude}
  }

  if (msg.type === LIKE) {
    newState.likes += 1
  }

  if (msg.type === LIST_ADD) {
    newState.items.push(msg.item)
  }

  if (msg.type === LIST_REMOVE) {
    if (newState.items[msg.index]) {
      newState.items.splice(msg.index, 1)
    }
  }

  return newState
}

// =================================
//      SIMULATE NEW MESSAGES
// =================================

setInterval( () => {
  const latitude  = (Math.random() * 90).toFixed(2)
  const longitude = (Math.random() * 180).toFixed(2)
  const msg       = msgGPS(latitude, longitude)
  // Do something here to get the message into the store
  store = dispatch(msg, store)
}, 4 * 1000)

setInterval( () => {
  const msg = msgLike()
  // Do something here to get the message into the store
  store = dispatch(msg, store)
}, 2 * 1000)

let itemCount = 2
setInterval( () => {
  itemCount += 1
  const item = {text: `item ${itemCount}`}
  const msg  = msgAdd(item)
  // Do something here to get the message into the store
  store = dispatch(msg, store)
}, 2.5 * 1000)

setInterval( () => {
  const index = Math.floor(Math.random() * 3)
  const msg   = msgRemove(index)
  // Do something here to get the message into the store
  store = dispatch(msg, store)
}, 3 * 1000)

// =================================
//           RENDER LOOP
// =================================
let renderCount = 0
log(`\n======= FRAME ${renderCount} ========`)
renderAll(store)
setInterval(() => {
  renderCount += 1
  log(`\n======= FRAME ${renderCount} ========`)
  renderAll(store)
}, 3 * 1000)
