const app = require('./app')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const server = app.listen(6000, () => {
  console.log(`Server is working on http://127.0.0.1:6000`)
})
