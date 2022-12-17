const express = require('express')
const app = express()

app.get('/api', (req,res) => {
    res.json({
        name: 'testing',
        profess: 'software eng'
    })
})

app.listen(5000)