const crypto = require('crypto')
const validator = require('./validator')('event')

module.exports = (db) => {
  const events = db.collection('events')

  return {
    get: get.bind(null, events),
    insert: insert.bind(null, events),
    incrementVote: incrementVote.bind(null, events),
    addAuthToken: addAuthToken.bind(null, events)
  }
}

function addAuthToken (events, id, token) {
  return new Promise( (resolve, reject) => {
    const query = { id }
    const update = { $addToSet: { tokens: token } }
    const options = { new: true }

    events
      .findAndModify(query, [], update, options)
      .then( (result) => resolve(result.value))
      .catch(reject)
  })
}

function incrementVote (events, id, time) {
  return new Promise( (resolve, reject) => {
    const query = { id }

    const queryProp = `options.${time}`
    const incVal = {}
    incVal[queryProp] = 1
    const update = { $inc: incVal }

    const options = { new: true }

    events
    .findAndModify(query, [], update, options)
    .then( (result) => resolve(result.value))
    .catch(reject)
  })
}

function get (events, id) {
  return new Promise( (resolve, reject) => {
    events
      .find({ id })
      .limit(1)
      .next()
      .then((event) => {
        if (!event) {
          throw new Error('not found')
        } else {
          resolve(event)
        }
      })
      .catch(reject)
  })
}

function insert (events, event) {
  return new Promise( (resolve, reject) => {
    // validate
    if (!validator.validate(event))
      reject(new Error('invalid'))

    const cleanedEvent = validator.extract(event, { includeOptional: true })
    cleanedEvent.id = genEventId();

    events
      .insertOne(cleanedEvent)
      .then( (result) => resolve(result.ops[0]))
      .catch(reject)
  })
}

function genEventId () {
  return crypto
          .createHash('md5')
          .update(crypto.pseudoRandomBytes(15).toString())
          .digest('hex')
          .slice(0, 10)
}
