const dotenv = require('dotenv')
const environment = require('./environment.json')
const node_env = process.env.NODE_ENV || 'develop'

dotenv.config({ silent: true })

module.exports = {
  PORT: process.env.PORT || environment['PORT'][node_env],
  EXEMPLO: process.env.EXEMPLO || environment['EXEMPLO'][node_env]
}