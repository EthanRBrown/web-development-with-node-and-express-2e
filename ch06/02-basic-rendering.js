const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

// the following is needed to use views
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// see the views/about.hbs file for the contents of this view
app.get('/about', (req, res) => {
  res.render('about')
})

app.get('*', (req, res) => res.send('Check out our "<a href="/about">About</a>" page!'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/about\n`))
