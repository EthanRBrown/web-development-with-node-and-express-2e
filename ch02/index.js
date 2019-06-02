const http = require('http')
const port = process.env.PORT || 5555
const pathUtils = require('path')
const fs = require('fs')

const attractions = {
  byId: {
    'a1': {
      id: 'a1',
      name: "Crater Lake",
      description: "Crater Lake is formed from the caldera of an extinct "
        + "volcano and offers many beautiful outdoor activities.",
      location: { lat: 42.8684, lng: 122.1685 },
    },
    'a2': {
      id: 'a2',
      name: "Portland Japanese Garden",
      description: "The Portland Japanese Garden offers a peaceful respite "
        + "from the bustle of the city.",
      location: { lat: 45.5188, lng: -122.7080 },
    },
  },
  ids: ['a1', 'a2'],
}
const products = {
  byId: {
    'p1': { id: 'p1', name: "Keep Oregon Weird Magenet", price: 4.95 },
    'p2': { id: 'p2', name: "PDX Airpor Socks", price: 15.00 },
  },
  ids: ['p1', 'p2'],
}

function handleDataRoute(path, res) {
  const headers = { 'Content-Type': 'application/json' }
  switch(path) {
    case '/api/attractions':
      res.writeHead(200, headers)
      res.end(JSON.stringify(attractions))
      break
    case '/api/products':
      res.writeHead(200, products)
      res.end(JSON.stringify(products))
      break
    default:
      res.writeHead(404, headers)
      res.end(JSON.stringify({ error: 'Not Found' }))
      break
  }
}

function handleStaticRoute(path, res) {
  const contentTypes = {
    '.png': 'image/png',
    '.ico': 'image/vnd.microsoft.icon',
    '.html': 'text/html',
  }
  const contentType = contentTypes[pathUtils.extname(path).toLowerCase()]
  if(!contentType) {
    res.writeHead(500, { 'Content-Type': 'text/plain' })
    res.end('500 - Content Type Not Supported')
  }
  console.log('loading: ', pathUtils.join(__dirname, 'public', path))
  fs.readFile(pathUtils.join(__dirname, 'public', path), (err, data) => {
    if(err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      return res.end('404 - Not Found')
    }
    res.writeHead(200, { 'Content-Type': contentType })
    res.end(data)
  })
}

const server = http.createServer((req, res) => { 
  // normalize url by removing querystring, optional
  // trailing slash, and making it lowercase
  const urlPath = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
  if(urlPath.startsWith('/api')) return handleDataRoute(urlPath, res)
  if(/\.\w+$/.test(urlPath)) return handleStaticRoute(urlPath, res)
  return handleStaticRoute('index.html', res)
})

server.listen(port, () => console.log(`server started on port ${port}; ` +
  'press Ctrl-C to terminate....'))
