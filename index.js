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

// =================================
//          SIMULATE CHANGES
// =================================

setInterval( () => {
  const latitude  = (Math.random() * 90).toFixed(2)
  const longitude = (Math.random() * 180).toFixed(2)
  const msg       = msgGPS(latitude, longitude)

  // Do something here to get the message into the store

}, 4 * 1000)

setInterval( () => {
  const msg = msgLike()

  // Do something here to get the message into the store

}, 2 * 1000)

let itemCount = 2
setInterval( () => {
  itemCount += 1
  const item = {text: `item ${itemCount}`}
  const msg  = msgAdd(item)

  // Do something here to get the message into the store

}, 2.5 * 1000)

setInterval( () => {
  const index = Math.floor(Math.random() * 3)
  const msg   = msgRemove(index)

  // Do something here to get the message into the store

}, 3 * 1000)

// =================================
//           RENDER LOOP
// =================================

// Create some way to render all of the views
// perhaps a loop using setInterval or
// render on every change to the store

const renderAllTheThings = () => {
  log("Hello World")
}

renderAllTheThings()
