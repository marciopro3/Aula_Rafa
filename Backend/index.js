import express from 'express'
import bodyParser from 'body-parser'
import mysql from 'mysql'
import cors from 'cors'
const app = express()

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '134679',
    database: 'cadastro'

});


app.use(cors())

app.use(bodyParser.json())

app.get('/', (req, res) => {

    res.send('Teste01')

})

app.get('/db', (req, res) => {


    connection.connect(function (err) {
        if (err) {
            res.send('erro de conexão: ' + err.stack)
            return;
        }
        res.send('Conectado com o id: ' + connection.threadId);
    })

})

app.get('/usuario', (req, res) => {

    connection.query('SELECT * FROM usuario', function (error, results, fields) {
        if (error) {
            res.send('Erro')
            return
        }
        res.send(results)
    })
})

app.get('/usuario/:id', (req, res) => {
    const id = req.params.id

    connection.query(`SELECT * FROM usuario WHERE id = ${id}`, function (error, results, fields) {
        if (error) {
            res.send('Erro')
            return
        }
        res.send(results)
    })
})

app.post('/usuario', (req, res) => {
    const nome = req.body.nome
    connection.query(`INSERT INTO usuario (nome) VALUES ('${nome}')`, function (error, results, fields) {
        if (error) {
            res.send('Erro')
            return
        }
        res.send(results)
    })
})

app.put('/usuario/:id', (req, res) => {
    const id = req.params.id
    const nome = req.body.nome
    connection.query(`UPDATE usuario SET nome = '${nome}' WHERE id = ${id}`, function (error, results, fields) {
        if (error) {
            res.send('Erro')
            return
        }
        res.send(results)
    })

})

app.delete('/usuario/:id', (req, res) => {
    const id = req.params.id
    connection.query(`DELETE FROM usuario WHERE id = ${id}`, function (error, results, fields) {
        if (error) {
            res.send('Erro')
            return
        }
        res.send(results)
    })

})

app.listen(3001, () => {

    console.log('Servidor rodando na porta 3001')

})