import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const __dirname = path.resolve()
const dbBlogsPath = path.resolve(__dirname, './data/blogs.json')
const dbDeletedBlogsPath = path.resolve(__dirname, './data/deletedBlogs.json')

router.get('/', (req, res) => {
  fs.readFile(dbBlogsPath, (err, data) => {
    if (err) res.status(404).render('errorPage', {msg: err})
    const blogList = JSON.parse(data)
    res.render('blogList', {blogs: blogList})
  })
})
// deleting the blog
router.post('/:blogId', (req, res) => {
  const id = req.params.blogId
  if (id) {
    fs.readFile(dbBlogsPath, (err, data) => {
      if (err) res.status(404).render('errorPage', {msg: err})
      const blogList = JSON.parse(data)
      const blogs = blogList.filter(blog => blog.id !== id)

      fs.readFile(dbDeletedBlogsPath, (err, data) => {
        if (err) res.status(404).render('errorPage', {msg: err})
        const deletedBlogList = JSON.parse(data)
        const blog = blogList.find(blog => blog.id === id)
        deletedBlogList.push(blog)

        fs.writeFile(dbDeletedBlogsPath, JSON.stringify(deletedBlogList), (err) => {
          if (err) res.status(400).render('errorPage', {msg: err})
        })
      })

      fs.writeFile(dbBlogsPath, JSON.stringify(blogs), (err) => {
        if (err) res.status(400).render('errorPage', {msg: err})
        res.render('thankYou', {Thank: 'Thank you for using our app!'})
      })
    })
  }
})

export default router