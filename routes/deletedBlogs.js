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

router.route('/:blogId')
    .get((req, res) => {
      const id = req.params.blogId
      if (id) {
        fs.readFile(dbDeletedBlogsPath, (err, data) => {
          if (err) res.status(404).render('errorPage', {msg: err})
          const blogList = JSON.parse(data)
          const blog = blogList.find(blog => blog.id === id)
          if(blog) res.render('blogDetails', {blog: blog, deleted: true})
          else res.status(404).render('errorPage', {msg: 'Requested blog is not found!'})
        })
      } else {
        res.status(400).render('errorPage', {msg: 'You have not selected blog yet!'})
      }
    })
    // Deleting blog
    .post((req, res) => {
      const id = req.params.blogId
      if (id) {
        fs.readFile(dbDeletedBlogsPath, (err, data) => {
          if (err) res.status(404).render('errorPage', {msg: err})
          const blogList = JSON.parse(data)
          const blogs = blogList.filter(blog => blog.id !== id)

          fs.writeFile(dbDeletedBlogsPath, JSON.stringify(blogs), (err) => {
            if (err) res.status(400).render('errorPage', {msg: err})
            res.render('thankYou', {thank: 'Thank you for using our app. The blog was deleted!'})
          })
        })
      }
    })


export default router