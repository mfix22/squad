const validator = require('./validator')('event')

module.exports = (db) => {
  const events = db.collection('events')

  return {
    get: get.bind(null, events),
    insert: insert.bind(null, events),
  }
}

function get (events, id) {
  return new Promise( (resolve, reject) => {
    events
      .find({ id })
      .limit(1)
      .next()
      .then((event) => {
        if (!event) {
          throw new Error('Not found')
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

    events
      .insertOne(validator.extract(event))
      .then(resolve)
      .catch(reject)
  })
}

function genEventId () {
  return crypto
          .createHash('md5')
          .update(crypto.pseudoRandomBytes(15).toString())
          .digest('hex')
}
