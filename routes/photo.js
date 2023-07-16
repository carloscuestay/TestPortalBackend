const express = require('express')
const photo_service = require('../services/photo')

const route_photo = express.Router()

route_photo.get('/get_all', async (req, res) => {
  res.json({
    ok: true,
    photos: await photo_service.get_all() 
  })
})

route_photo.get('/get/:id', async (req, res) => {
  res.json({
    message: 'get id photo' + req.params.id 
  })
})

route_photo.get('/get_by_user/:id_user', async (req, res) => {
  res.json({
    ok: true,
    photos: await photo_service.get_by_userId(req.params.id_user) 
  })
})

route_photo.get('/get_by_user/:email_user', async (req, res) => {
  res.json({
    ok: true,
    photos: await photo_service.get_by_userEmail(req.params.email_user) 
  })
})

route_photo.get('/user/:email_user', async (req, res) => {
  res.json({
    ok: true,
    user: await photo_service.get_user_by_email(req.params.email_user) 
  })
})

route_photo.post('/create', async (req, res) => {
  console.log('mirame', req.body);
  const result = await photo_service.create(req.body)
  res.json(result)
})

route_photo.put('/update', async (req, res) => {
  res.json({
    message: 'put id user photo' + req.body
  })
})

route_photo.delete('/delete/:id', async (req, res) => {
  res.json({
    message: 'delete photo' + req.params.id
  })
})

module.exports = route_photo