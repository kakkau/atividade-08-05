const express = require('express')
const app = express()

app.use(express.json())

// rotas
const pessoasRouter = require('./routes/pessoas')
app.use(pessoasRouter)


app.listen(3000, () => {
    console.log("Aplicação rodando em http://localhost:3000")
})