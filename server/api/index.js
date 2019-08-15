const express = require('express')
const router = express.Router()
const db = require('../helpers/db')

router.get('/status', (req, res) => {
  res.send('All good')
})
const passport = require('passport')

router.get('/protected-status',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send('All good');
  })

router.get('/users', (req, res) => {
  db.getUsers().then(data => {
    res.send(data)
  })
})

router.get('/hotels', (req, res) => {
  db.getHotels().then(hotels => {
    res.json(hotels);
  })
})

module.exports = router
