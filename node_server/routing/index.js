const { Router }          = require('express')
const eventController     = require('../controllers/event')
const voteController      = require('../controllers/vote')
const authTokenController = require('../controllers/authToken')
const adminController     = require('../controllers/admin')
const healthController     = require('../controllers/health')

module.exports = function ({ db }) {

  const router = Router()

  router.all('/healthcheck', healthController())
  router.all('/event/:eventId?', eventController(db))
  router.all('/vote/:eventId', voteController(db))
  router.all('/admin/:eventId', adminController(db))
  router.all('/authToken/:eventId', authTokenController(db))

  // 404 if none found
  router.use((req, res, next) => {
    res.status(404).send('not found!')
  })

  return router
}
