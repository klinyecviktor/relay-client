const express = require('express')

const app = express()
const engines = require('consolidate');

app.use(express.static('dist'))
app.set('views', __dirname + '/dist');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.render('index.html')
})

app.listen(4500, () => {
    console.log('Example app listening on port 4500!')
})
