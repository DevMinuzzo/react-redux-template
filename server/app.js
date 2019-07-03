const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')

const config = require('./environment/config')
const apiRoutes = require('./routes/api-routes')

const app = express()

app.use(cors())
app.use(session({ secret: 'media-token-api', cookie: { maxAge: 1800000 } }))
app.use(bodyParser.json({
  type: (req) => req.headers['content-type'] === 'application/json'
}))

apiRoutes(app)

app.listen(config.PORT, () => {
  console.log(`Servidor iniciado na porta ${config.PORT}`)
})