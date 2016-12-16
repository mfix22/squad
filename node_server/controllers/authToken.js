const eventModel      = require('../models/event')
const genErrorHandler = require('../lib/errorHandler.js')
const { send404 } = require('../lib/util')

module.exports = (db) => {
  return (req, res) => {
    const opts = {
      events: eventModel(db),
      error: genErrorHandler(res)
    }

    switch (req.method) {
      case 'POST':
        post(req, res, opts)
        break
      default:
        send404(req, res)
    }
  }
}

function post (req, res, opts) {
  const { events, error } = opts

  if (!req.params.eventId || !req.body.token || typeof req.body.token !== 'string')
    res.status(400).send('Invalid')

  events
    .addAuthToken(req.params.eventId, req.body.token)
    .then(res.status(200).json)
    .catch(error)
}
