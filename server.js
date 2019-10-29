const express = require('express')
const app = express()
const port = 3000

//memanggil library body-parser
const bodyParser = require("body-parser")
const Mongoose = require('./mongoModel/mongoConfig')
const PersonModel = Mongoose.model("person",{
    firstname: String,
    lastname: String
})

//config body-parser
app.use(bodyParser.urlencoded({extended:true})) // menangkap type request dalam bentuk form urlencoded
app.use(bodyParser.json()) // menangkap url dalam bentuk json
app.get('/', (req,res) => res.send('Hewwo World!')) // req request response

//membuat request post
//key request: firstname, lastname isi di Body > form urlencoded
app.post('/hello', function(req,res){
    const response = {
        statusCode: 200,
        error: "",
        message: "hello json",
        content: req.body
    }
    res.json(response);
})

app.post('/profile/create', async (req, res) => {
    //Do something here
    console.log(req.body)
    const insert = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    var person = new PersonModel(insert)
    var result = await person.save()
    const response = {
        statusCode: 200,
        error: "",
        message: "hello resu",
        content: result
    }
    res.json(response);
})

//commit lagi dengan nama "membuat request post"
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

