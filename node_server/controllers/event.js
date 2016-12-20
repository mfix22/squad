const crypto          = require('crypto')
const eventModel      = require('../models/event')
const genErrorHandler = require('../lib/errorHandler.js')

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
    }
  }
}

function get (req, res, opts) {

  const { events, error } = opts

  if (!req.params.eventId)
    return res.status(400).send('Invalid')

  events
    .get(req.params.eventId)
    .then( (event) => {
      res.status(200).json(event)
    })
    .catch(error)
}

function post (req, res, opts) {
  const { events, error } = opts
  events
    .insert(req.body)
    .then( (event) => {
      res.status(200).json(event)
    })
    .catch(error)
}
