const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

// the following is needed to use views
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// see views/custom-layout.hbs for the contents, and
// views/layouts/custom.hbs for the layout
app.get('/custom-layout', (req, res) =>
  res.render('custom-layout', { layout: 'custom' })
)

app.get('*', (req, res) => res.send('Check out the "<a href="/custom-layout">custom layout</a>" page!'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/custom-layout\n`))
