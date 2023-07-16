const express = require('express')

const {create_user, login_user} = require('../services/auth')

const route_auth = express.Router()

route_auth.post('/register', async (req, res) => {
  const respuesta = await create_user(req.body)
  res.json(respuesta)
})

route_auth.post('/login', async (req, res) => {
  const respuesta = await login_user(req.body)
  res.json(respuesta)
})

module.exports = route_auth