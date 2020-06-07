const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

// provide a home page
app.get('/', (req, res) => res.render('06-home.handlebars'))

const autoViews = {}
const fs = require('fs')
const { promisify } = require('util')
const fileExists = promisify(fs.exists)

app.use(async (req, res, next) => {
  const path = req.path.toLowerCase()
  // check cache; if it's there, render the view
  if(autoViews[path]) return res.render(autoViews[path])
  // if it's not in the cache, see if there's
  // a .handlebars file that matches
  if(await fileExists(__dirname + '/views' + path + '.handlebars')) {
    autoViews[path] = path.replace(/^\//, '')
    return res.render(autoViews[path])
  }
  // no view found; pass on to 404 handler
  next()
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log( `\nnavigate to http://localhost:${port}/staff`))
