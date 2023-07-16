const jwt = require('jsonwebtoken')

const validate = async (req, res, next) => {
  const token = req.header('token-auth')

  console.log('token', token);

  if (!token) {
    return res.json({
      ok: false,
      message: 'Token no enviado'
    })
  }

  try {
    jwt.verify(token, process.env.SECRET_TOKEN)
    next()

  } catch (error) {
    return res.json({
      ok: false,
      message: 'Token invalido'
    })
  }
}

module.exports = validate