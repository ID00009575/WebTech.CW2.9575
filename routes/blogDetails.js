import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const __dirname = path.resolve()
const dbBlogsPath = path.resolve(__dirname, './data/blogs.json')

router.get('/:blogId', (req, res) => {
  const id = req.params.blogId
  if (id) {
    fs.readFile(dbBlogsPath, (err, data) => {
      if (err) res.status(404).render('errorPage', {msg: err})
      const blogList = JSON.parse(data)
      const blog = blogList.find(blog => blog.id === id)
      if(blog) res.render('blogDetails', {blog: blog, deleted: false})
      else res.status(404).render('errorPage', {msg: 'Requested blog is not found!'})
    })
  } else {
    res.status(400).render('errorPage', {msg: 'You have not selected blog yet!'})
  }
})

export default router