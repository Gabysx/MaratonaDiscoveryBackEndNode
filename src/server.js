const express = require("express")
const server = express()
const routes = require("./routes")

// usando o template engine
server.set('view engine', 'ejs')

// Habilitar aquivos estaticos
server.use(express.static("public"))

// usar o req.body - liberação do corpo da requisição 
server.use(express.urlencoded({extends: true }))

//routes
server.use(routes)


server.listen(3000, () => console.log('OK Rodando'))