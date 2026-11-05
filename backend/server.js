require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const clientRoutes = require("./routes/clients");

const app = express();

// Autoriser le frontend à appeler l'API
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000"
  })
);

// Lire les corps JSON des requêtes
app.use(express.json());

// Route de test
app.get("/", (req, res) => {
  res.json({ message: "API CRM opérationnelle" });
});

// Se connecter à MongoDB avant les routes clients
app.use("/api/clients", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Connexion à la base impossible" });
  }
});

// Routes CRUD
app.use("/api/clients", clientRoutes);

// Gestion générale des erreurs
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: "Requête invalide"
  });
});

// En local, démarrer le serveur.
// Sur Vercel, Vercel démarre l'application.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}` );
  });
}

module.exports = app;