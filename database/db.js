const mongoose = require('mongoose')

const user_db = process.env.USERDB
const pass_db = process.env.PASSDB
const name_db = process.env.NAMEDB
const host_db = process.env.HOSTDB

mongoose.connect(`mongodb+srv://${user_db}:${pass_db}@${host_db}${name_db}`)
.then(() => console.log(`Running Databe Mongo Atlas ${name_db}`))
.catch(e => console.log(`Error fatal database ${e.message}`))