const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')

const cors = require('cors')

const app = express()

app.use(cors())

mongoose.connect('mongodb+srv://felipealves:felipealves@cluster0.b8duk.mongodb.net/ghhgfghf?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})


app.use(express.json())
app.use(routes)


app.listen(3333)