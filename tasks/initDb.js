// node tasks/initDb.js

const mongoose = require('mongoose')
const { dishes } = require('../constants/japanDishes')
const Article = require('../models/Article')
require('dotenv').config()

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connecté à MongoDB')
    initializeDatabase()
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion MongoDB:', err)
  })

// Fonction pour initialiser la base de données
async function initializeDatabase() {
  try {
    // Supprimer tous les articles existants
    await Article.deleteMany({})
    console.log('🗑️ Tous les articles existants ont été supprimés')

    // Ajouter les nouveaux articles
    await Article.insertMany(dishes)
    console.log(`${dishes.length} articles ont été ajoutés à la base de données`)

    // Fermer la connexion à la base de données
    mongoose.connection.close()
    console.log('🔒 Connexion à MongoDB fermée')
  } catch (err) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', err)
  }
}