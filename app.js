// Built in modules
import path from 'path'

// Third part modules
import express from 'express'

// Local modules
import indexRouter from './routes/index.js'

// General variables
const PORT = process.env.PORT || 3000
const app = express()
const __dirname = path.resolve()


// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/static', express.static(__dirname + '/public'))

// Set up of  template/view engine.
app.set('view engine', 'pug')
app.set('views', './views')

// Route Handlers
app.use('/', indexRouter)

// Server starting
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}...`)
})
