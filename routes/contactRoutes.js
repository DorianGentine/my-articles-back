const express = require("express")
const nodemailer = require("nodemailer")

const router = express.Router()

router.post("/contact/send", async (req, res) => {
  const { name, email, message } = req.body

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER || '',
      pass: process.env.GMAIL_PASSWORD || ''
    },
  })

  const mailOptions = {
    to: process.env.TO_MAIL || '',
    subject: `Message ${name ? `de "${name}"` : ''} via my-articles du ${new Date().toLocaleDateString("fr-FR")}`,
    text: `${message}\n\nEnvoyé par : ${email || "Adresse email non fournie"}`,
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, error: "Email non envoyé" })
  }
})

module.exports = router
