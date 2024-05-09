const express = require('express')

const router = express.Router()

let listaPessoas = [
    {
        nome: "João",
        idade: 20,
       email: "joão@email.com",
        telefone: "61900010002"
    }
]

// middlewares de validação
// Validar se o produto existe
function validarPessoas(req, res, next) {
    const nome = req.params.nome
    const pessoa = listaPessoas.find(pessoa => pessoa.nome == nome)
    if (pessoa) {
        req.pessoa = pessoa
        next()
    } else {
        return res.status(404).json({ mensagem: "pessoa não encontrado!" })
    }
}

// validar os atributos do corpo
function validarAtributos(req, res, next) {
    const dadosRecebidos = req.body
    if (!dadosRecebidos.idade || !dadosRecebidos.email) {
        return res.status(400).json({ mensagem: "nome e idade são obrigatórios" })
    } else {
        next()
    }
}


// READ -> Buscar todos os produtos
router.get('/pessoas', (req, res) => {
    res.status(200).json(listaPessoas)
})

// READ -> Busca de produto especifico
router.get('/pessoas/:nome', validarPessoas, (req, res) => {
    res.json(req.pessoa)
})


// CREATE -> Cadastro de um produto
router.post('/pessoas', validarAtributos, (req, res) => {
    const dados = req.body

    const pessoa = {
        nome: Math.round(Math.random() * 1000),
        idade: dados.idade,
        email: dados.email,
        telefone: dados.telefone
    }

    listaPessoas.push(pessoa)

    res.status(201).json(
        {
            mensagem: "Pessoa cadastrado com sucesso!",
            pessoa
        }
    )
})

// UPDATE -> Alterar um produto
router.put('/pessoas/:nome', validarAtributos, validarPessoas, (req, res) => {
    const nome = req.params.nome
    const novosDados = req.body

    const index = listaPessoas.findIndex(pessoa => pessoa.nome == nome)
    
    const pessoa = {
        nome: Number(nome),
        idade: novosDados.idade,
        email: novosDados.email,
        telefone: novosDados.telefone
    }

    listaPessoas[index] = pessoa

    res.status(200).json(
        {
            mensagem: "Pessoa alterado com sucesso!",
            pessoa
        }
    )
})

// DELETE -> Excluir produto
router.delete('/pessoas/:nome', validarPessoas, (req, res) => {
    const nome = req.params.nome
    const index = listaPessoas.findIndex(pessoa => pessoa.nome == nome)
    listaPessoas.splice(index, 1)
    res.status(200).json({ mensagem: "Pessoa excluido sucesso!" })
})




module.exports = router