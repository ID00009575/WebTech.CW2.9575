// Built in modules
import path from 'path'

// Third part modules
import express from 'express'

// Local modules
import indexRouter from './routes/index.js'
import blogDetailsRouter from './routes/blogDetails.js'
import blogListRouter from './routes/blogList.js'
import createBlogRouter from './routes/createBlog.js'
import deletedBlogsRouter from './routes/deletedBlogs.js'
import errorRouter from './routes/error.js'

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
app.use('/blog-details', blogDetailsRouter)
app.use('/all-blogs', blogListRouter)
app.use('/new-blog', createBlogRouter)
app.use('/deleted-blogs', deletedBlogsRouter)
app.use('/error', errorRouter)

// Server starting
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}...`)
})
