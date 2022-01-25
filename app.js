const express = require('express')
const app = express()

// routes
app.get('/',(req,res)=>{
    res.send('Hello sensei')
})

// listen
app.listen(8000)