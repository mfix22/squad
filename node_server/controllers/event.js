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
      case 'GET':
        get(req, res, opts)
        break
      case 'POST':
        post(req, res, opts)
        break
      default:
        send404(req, res)
    }
  }
}

function get (req, res, opts) {
  const { events, error } = opts

  if (!req.params.eventId)
    return res.status(400).send('Invalid')

  events
    .get(req.params.eventId)
    .then(res.status(200).json)
    .catch(error)
}

function post (req, res, opts) {
  const { events, error } = opts
  events
    .insert(req.body)
    .then(res.status(200).json)
    .catch(error)
}
