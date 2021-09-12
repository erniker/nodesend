const express = require("express")
const dbConnect = require("./config/db")

// crear servidor
const app = express()

// Conectar a la DB
dbConnect()

console.log("NodeSend starting...")

// Puerto de la app
const port = process.env.Port || 4000

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`)
})
