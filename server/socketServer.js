const express = require("express")
const app = express()
const http = require('http')
const {Server} = require("socket.io")
const cors = require("cors")

app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
  socket.on("connected", (room) => {
    console.log("Connected:", socket.id)
  })
  
  socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id)
  })
  
  socket.on("message", (message, callback) => {
    socket.broadcast.emit("message", message)
    callback()
  })
})

server.listen(4000, () => {
    console.log("STARTED SERVER")
})