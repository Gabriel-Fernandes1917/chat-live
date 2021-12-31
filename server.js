const express = require('express')


const path = require('path')
/*const { Socket } = require('socket.io')*/

const app = express()
//protocool
const server = require('http').createServer(app)
const io = require('socket.io')(server)
// public files
app.use(express.static(path.join(__dirname, 'public')))
// where stay views
app.set('views', path.join(__dirname, 'public'))
// config views how HTML
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')


app.use('/', (req, res)=>{
    res.render('index.html')
})

let messages = []

io.on('connection', socket =>{
    console.log(`Socket conectado: ${socket.id}`)

    socket.emit('previousMessages', messages)

    socket.on('sendMessage', data => {
        messages.push(data)
        console.log(data)
        socket.broadcast.emit('receivedMessage', data) // broadcast send for all de sockets in lan
    })
})

server.listen(300, ()=>{
    console.log("server ON")
})