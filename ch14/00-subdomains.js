const express = require('express')
const vhost = require('vhost')
const app = express()

// create "admin" subdomain...this should appear
// before all your other routes
const admin = express.Router()
app.use(vhost('admin.meadowlark.local', admin))

// create admin routes; these can be defined anywhere
admin.get('*', (req, res) => res.send('Welcome, Admin!'))

// regular routes
app.get('*', (req, res) => res.send('Welcome, User!'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(
  "\nmake sure you've added the following to your hosts file:" +
  "\n" +
  "\n  127.0.0.1 admin.meadowlark.local" +
  "\n  127.0.0.1 meadowlark.local" +
  "\n" +
  "\nthen navigate to:" +
  "\n" +
  `\n  http://meadowlark.local:${port}` +
  "\n" +
  "\n and" +
  `\n  http://admin.meadowlark.local:${port}\n`))
