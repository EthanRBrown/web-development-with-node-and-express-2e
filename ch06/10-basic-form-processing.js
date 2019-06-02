const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()

// the following is needed to use views
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// this is necessary to parse form responses
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/thank-you', (req, res) => res.render('10-thank-you'))

// see the views/10-home.hbs file for the contents of this view
app.get('*', (req, res) => res.render('10-home'))

app.post('/process-contact', (req, res) => {
  console.log(`received contact from ${req.body.name} <${req.body.email}>`)
  res.redirect(303, '/thank-you')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}\n`))
