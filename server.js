require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")

const app = express()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.error("❌ Erreur de connexion MongoDB:", err))

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/", require("./routes/articleRoutes"))
app.use("/", require("./routes/contactRoutes"))
app.get("/", (req, res) => {
  res.send("OK!")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`))
