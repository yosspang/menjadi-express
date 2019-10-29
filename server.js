const express = require('express')
const app = express()
const port = 3000

//memanggil library body-parser
const bodyParser = require("body-parser")

//memanggil mongoConfig.js di file server
const Mongoose = require('./mongoModel/mongoConfig')

//membuat Model untuk mongodb
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
    if(!req.body.firstname || !req.body.lastname){
        res.status(400).json({
            statusCode: 400,
            error: "first/last name parameter is required",
            message: "first/last name parameter is required"
        })
    }
    const insert = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    var person = new PersonModel(insert)
    var result = await person.save()
    const response = {
        statusCode: 200,
        error: "",
        message: "hello result",
        content: result
    }
    res.json(response);
})

app.get('/profile/list', async (req,res) =>{
    var person =await PersonModel.find().exec();
    const response = {
        statusCode: 200,
        error: "",
        message: "List Person",
        content: person
    }
    res.json(response);
})

app.get('/profile/detail/:id', async(req,res)=>{
    var person =await PersonModel.findById(req.params.id).exec();
    const response = {
        statusCode: 200,
        error: "",
        message: "data found",
        content: person
    }
    res.json(response);
})

app.put('/profile/update/:id', async(req,res)=>{
    let statusCode = 200
    let message = "Update Person"
    var person = await PersonModel.findByIdAndUpdate(req.params.id,req.body, {new:true}).exec();
    const response = {
        statusCode: statusCode,
        error: message,
        message: message,
        content: person
    }
    res.status(statusCode).json(response);
})

app.delete('/profile/delete/:id', async(req,res)=>{
    const isExist = Mongoose.Types.ObjectId.isValid(req.params.id)
    // check dataobject id valid jika valid lakukan eksekusi delete
    let statusCode = 200
    let message = "Delete Person"
    if(isExist){ //jika id valid maka jalankan method delete
        var person = await PersonModel.findByIdAndDelete(req.params.id).exec();
    }else{
        statusCode= 404
        message= "Object Id invalid"
        var person = null
    }
    
    const response = {
        statusCode: statusCode,
        error: message,
        message: message,
        content: person
    }
    res.status(statusCode).json(response);
})

//commit lagi dengan nama "membuat request post"
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
