const hapi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const user_regex = hapi.object({
  name: hapi.string().min(3).max(256),
  email: hapi.string().min(6).max(256).email().required(),
  celular: hapi.string().min(10).max(10).pattern(/^[0-9]+$/),
  password: hapi.string().min(3).max(256).required()
})

const create_user = async user_params => {

  const { error } = user_regex.validate(user_params)

  if (error) {
    return {
      message: 'algo salio mal',
      error: error.details[0].message
    }
  }

  const validate_email = await User.findOne({ email: user_params.email })
  if (validate_email) {
    return {
      message: 'el correo ya existe',
    }
  }

  const salt = await bcrypt.genSalt(10)
  const encrypt = await bcrypt.hash(user_params.password, salt)

  user_params.password = encrypt

  const user = new User(user_params)

  const user_response = await user.save()

  return {
    message: 'usuario guardado',
    user: user_response
  }
}

const login_regex = hapi.object({
  email: hapi.string().min(6).max(256).email().required(),
  password: hapi.string().min(3).max(256).required()
})

const login_user = async credential => {

  const { error } = login_regex.validate(credential)

  if (error) {
    return {
      message: 'error en credenciales',
      error: error.details[0].message
    }
  }

  const user_bd = await User.findOne({ email: credential.email })

  if (!user_bd) {
    return {
      message: 'usuario no existe',
    }
  }

  const is_password_valid = await bcrypt.compare(credential.password, user_bd.password)

  if (!is_password_valid) {
    return {
      message: 'password invalida',
    }
  }

  const token = jwt.sign({
    user_id: user_bd._id
  }, 
  process.env.SECRET_TOKEN,
  { expiresIn: '1800s' })

  return {
    message: 'Bienvenido',
    id_user: user_bd._id,
    token
  }
}


module.exports = {
  create_user,
  login_user
}