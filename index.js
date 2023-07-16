const express = require('express')
const body_parser = require('body-parser')
const cors = require('cors')
const auth = require('./routes/auth')
const photo = require('./routes/photo')
const validate = require('./services/validate_token')
require('dotenv').config()
require('./database/db')


const app = express()

app.use(cors({
  origin: '*'
}))
app.use(body_parser.json())


app.use('/api', auth)
app.use('/api/photo', validate, photo)

const port = process.env.PORT || 3200

app.listen(port, () => console.log(`server running on port ${port}`))