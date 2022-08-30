const express = require('express')
const app = express()
const cors = require('cors')
const mongoose  = require('mongoose')
const session = require('express-session')
require('dotenv').config()
const http = require('http').createServer(app)
const socketIo = require('socket.io')
const io = socketIo(http, {cors: {origin: 'http://localhost:3000'}})




app.use(express.json())
app.use(cors({origin: "http://localhost:3000", credentials: true, methods: 'GET, HEAD, PUT, PATCH, POST, DLETE'}))
app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false},
    })
)
app.set('socketio', io)
http.listen(4000)

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSW}@cluster0.xgv54mt.mongodb.net/?retryWrites=true&w=majority`).then(res => console.log('database connected')).catch(e => console.log(e))

const router = require('./router/mainRouter')
app.use('/', router)

let users = []
io.on("connect", (socket) => {
    console.log('socket connected');
    socket.on ('disconnect', () => {
        users = users.filter(x => x.id !== socket.id)
    })
    socket.on ("addUser", (user) => {
        const thisUser = {
            id: socket.id,
            name: user
        }
        users.push(thisUser)
    })

    socket.on("love", (usersData) => {
        const{user, match} = usersData
        console.log(user, match)
        const lovedOne = users.find(x => x.name === match)
        if (!lovedOne) return console.log('Loved one not found');
        
        io.to(lovedOne.id).emit('loved', user)
    })

})
