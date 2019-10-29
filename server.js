const express = require('express')
const app = express()
const port = 3000

//memanggil library body-parser
const bodyParser = require("body-parser")

//config body-parser
app.use(bodyParser.urlencoded({extended:true})) // menangkap type request dalam bentuk form urlencoded
app.use(bodyParser.json()) // menangkap url dalam bentuk json
app.get('/', (req,res) => res.send('Hewwo World!')) // req request response

//membuat request post
//key request: firstname, lastname isi di Body > form urlencoded
app.post('/hello', function(req,res){
    const respon = {
        statusCode: 200,
        error: "",
        message: "hello json",
        content: req.body
    }
    res.json(respon);
})
//commit lagi dengan nama "membuat request post"
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

