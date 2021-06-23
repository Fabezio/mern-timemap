const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// const { urlencoded } = require('body-parser')
const router = express.Router()

const app = express()
app.use(cors())
app.use(bodyParser.json())

// dbhandler
const { model, connect, Schema } = mongoose
const db = 'personal'
const pw = 'C0denCQRT!'
const distUrl = `mongodb+srv://fabezio:${pw}@cluster0.0r1tc.mongodb.net/${db}?retryWrites=true&w=majority`
const localUrl = `mongodb://localhost/${db}`

connect(distUrl, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => console.log(`Connected to mongodb, database: ${db}`))

const userSch = new Schema({
  firstname: String,
  lastname: String,
  email: String
})

const User = model('User', userSch)

// const newUser = new User({ firstname: "toto", lastname: "dupont", email: "toot-dupont@outlook.fr" })
// newUser.save()

app.get('/', (_, res) => {
  res.send('<a href="/users" >Users</a>')
})
app.use('/users', cors( ), router)
router.route('/').get((_, res) => {
  User.find({}, (err, user) => {
    err
      ? res.status(400).send('No found')
      : res.status(200).send(user)
  })
})
router.route('/:id').get((req, res) => {
  User.findOne({ _id: req.params.id }, (err, item) => {
    err
      ? res.status(400).send('No found')
      : res.status(200).send(item)
  })
})
router.route('/add').post((req, res) => {
    console.log(req.body)
  const newUser = new User(req.body)
  newUser.save()
  .then(() => res.status(200).send({mesage: `${newUser.lastname} ${newUser.firstname} enregistré`}))
  .catch((err) => res.status(400).send({error: `Enregistrement échoué, réessayez.`}))
})

app.listen(4000, () => console.log('server up & running port 4000'))
