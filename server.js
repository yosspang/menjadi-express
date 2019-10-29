const express = require('express')
const app = express()
const port = 3007


app.get('/', (req,res) => res.send('Hewwo World!')) // req request response

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

