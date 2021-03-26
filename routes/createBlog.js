import express from 'express';
import fs from 'fs';
import path from 'path';
import uniqueID from '../utils/uniqueId.js';
import multer from 'multer';

const __dirname = path.resolve()
const router = express.Router();
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, path.join(__dirname, 'public/images'));
  },
  filename: (req, file, cb) =>{
    cb(null, file.fieldname + '_' + uniqueID());
  }
});

const upload = multer({storage: storageConfig})
const dbBlogsPath = path.resolve(__dirname, './data/blogs.json')

router.route('/')
    .get((req, res) => {
      res.render('newBlog')
    })

router.post('/create-blog', upload.single('photo'), (req, res) => {
  if (req.body) {
    const blog = {
      id: uniqueID(),
      title: req.body.title,
      description: req.body.description,
      photo: req.file.filename
    }
    fs.readFile(dbBlogsPath, (err, data) => {
      if (err) res.status(404).render('errorPage', {msg: err})
      const blogList = JSON.parse(data)
      blogList.push(blog)

      fs.writeFile(dbBlogsPath, JSON.stringify(blogList), (err) => {
        if (err) res.status(400).render('errorPage', {msg: err})
        res.render('thankYou', {thank: 'Thank you for using our app! The blog was created!'})
      })
    })
  }
})

export default router