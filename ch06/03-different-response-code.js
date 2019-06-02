const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

// the following is needed to use views
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// see the views/error.hbs file for the contents of this view
app.get('/error', (req, res) => res.status(500).render('error'))

app.get('*', (req, res) => res.send('Check out our <a href="/error">error</a> page!'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/error\n`))
