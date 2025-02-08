const express = require("express")
const multer = require('multer')
const Article = require("../models/Article")
const { getBase64 } = require("../utils/article")

const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

router.get("/articles", async (req, res) => {
  const limit = 20
  try {
    const { page = 1 } = req.query
    const pageInt = typeof page === 'string' ? parseInt(page, 10) : 1

    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((pageInt - 1) * limit)
      .exec()

    const count = await Article.countDocuments()
    res.json({
      totalPages: Math.ceil(count / limit),
      articles
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get("/articles/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    res.json(article)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post("/articles", upload.fields([{ name: 'hero' }, { name: 'profilePicture' }]), async (req, res) => {
  try {
    const { title, content, excerpt, author } = req.body
    const heroB64 = req.files['hero'][0].size ? getBase64(req.files['hero'][0]) : undefined
    const profilePictureB64 = req.files['profilePicture'][0].size ? getBase64(req.files['profilePicture'][0]) : undefined

    const newArticle = new Article({
      title,
      content,
      excerpt,
      author,
      hero: heroB64 || `https://placehold.co/600x400/lightgreen/white?text=${title}`,
      profilePicture: profilePictureB64 || `https://placehold.co/150x150/lightgreen/white?text=${author.substring(0, 1)}`
    })

    await newArticle.save()
    res.status(201).json(newArticle)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put("/articles/:id", upload.fields([{ name: 'hero' }, { name: 'profilePicture' }]), async (req, res) => {
  try {
    const { title, content, excerpt, author } = req.body
    const heroB64 = req.files['hero'][0].size ? getBase64(req.files['hero'][0]) : undefined
    const profilePictureB64 = req.files['profilePicture'][0].size ? getBase64(req.files['profilePicture'][0]) : undefined

    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, {
      title,
      content,
      excerpt,
      author,
      hero,
      profilePicture
    }, { new: true })

    res.json(updatedArticle)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete("/articles/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id)
    res.json({ message: "Article deleted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router