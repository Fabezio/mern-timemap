const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// const { urlencoded } = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// dbhandler
const {model, connect, Schema}=mongoose
const db="personal"
const localUrl = `mongodb://localhost/${db}`

connect(localUrl, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const userSch = new Schema({
    firstname: String,
    lastname: String,
    email: String
})

const User = model('User', userSch)

// const newUser = new User({ firstname: "fabio", lastname: "boutentrain", email: "faboutentrain@free.fr" })
// newUser.save()

app.get('/', (_, res) => {
    res.send('<a href="/users" >Users</a>')
})

app.get('/users', (_, res) => {
    User.find({}, (err, user) => {
        err
            ? res.status(400).send('No found')
            : res.status(200).send(user)
        })
    })
app.get('/users/:id', (req, res) => {
    User.findOne({_id: req.params.id}, (err, item) => {
        err
        ? res.status(400).send('No found')
        : res.status(200).send(item)
        
    })
})

app.listen(4000, ()=> console.log('server up & running port 4000'))