const eventModel = require('../models/event')
const crypto     = require('crypto')

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

function genErrorHandler (res) {
  return (err) => {
    switch (err.message) {
      case 'not found':
        res.status(400).json({ message: 'Event not found.'})
        break
      case 'invalid':
        res.status(400).json({ message: 'Invalid request'})
        break
      default:
        res.status(500).json({ message: err.message})
    }
  }
}
