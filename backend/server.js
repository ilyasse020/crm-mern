const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "API CRM opérationnelle" });
});

app.listen(4000, () => {
  console.log("Serveur démarré sur http://localhost:4000" );
});