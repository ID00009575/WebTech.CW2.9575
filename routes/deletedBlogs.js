import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const __dirname = path.resolve()
const dbDeletedBlogsPath = path.resolve(__dirname, './data/deletedBlogs.json')

router.get('/', (req, res) => {
  fs.readFile(dbDeletedBlogsPath, (err, data) => {
    if (err) res.status(404).render('errorPage', {msg: err})
    const deletedBlogList = JSON.parse(data)
    res.render('deletedBlogs', {blogs: deletedBlogList})
  })
})
// Deleting blog
router.post('/:blogId', (req, res) => {
  const id = req.params.blogId
  if (id) {
    fs.readFile(dbDeletedBlogsPath, (err, data) => {
      if (err) res.status(404).render('errorPage', {msg: err})
      const blogList = JSON.parse(data)
      const blogs = blogList.filter(blog => blog.id !== id)

      fs.writeFile(dbDeletedBlogsPath, JSON.stringify(blogs), (err) => {
        if (err) res.status(400).render('errorPage', {msg: err})
        res.render('deletedBlogs', {thank: 'Thank you for using our app. The blog was deleted!'})
      })
    })
  }
})

export default router