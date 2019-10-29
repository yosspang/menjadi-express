const express = require('express')
const app = express()
const port = 3007


app.get('/', (req,res) => res.send('Hewwo World!')) // req request response

//membuat request post
app.post('/hello', function(req,res){
    const respon = {
        statusCode: 200,
        error: "",
        message: "hello json"
    }
    res.json(respon);
})
//commit lagi dengan nama "membuat request post"
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

