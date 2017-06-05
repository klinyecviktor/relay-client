const express = require('express')
const compression = require('compression')

const oneDay = 86400000;
const oneYear = 365 * oneDay

const app = express()

app.use(compression())

app.use(express.static('dist', {maxAge: oneYear}))

app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
})

app.listen(4500, () => {
    console.log('Example app listening on port 4500!')
})
