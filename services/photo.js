const hapi = require('@hapi/joi')
const Photo = require('../models/photo')
const User =  require('../models/user')

const get_all = async () => {
  return await Photo.find()
}

const get_by_id = async () => {
  
}

const get_by_userId = async (user_id) => {
  return await Photo.find({user_id})
}

const get_by_userEmail = async (email) => {
  return await Photo.find({email})
}

const get_user_by_email = async (email) => {
  return await User.findOne({email})
}

const photo_regex = hapi.object({
  url: hapi.string().min(6).required(),
  user_id: hapi.string().required(),
})

const create = async photo => {
  console.log(photo);
  const { error } = photo_regex.validate(photo)

  if (error) {
    return {
      ok: false,
      message: error.details[0].message
    }
  }

  const user_bd = await User.find({ _id: photo.user_id })
                            .catch(e => console.log(e.message))
  //const user_bd = await User.findById(photo.user_id)

  if (!user_bd) {
    return {
      ok: false,
      message: 'usuario no existe'
    }
  }

  return {
    ok: true,
    photo: await new Photo(photo).save()
  }
}

module.exports = {
  get_all,
  get_by_userId,
  get_by_userEmail,
  get_user_by_email,
  create
}