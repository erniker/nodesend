const express = require("express")
const dbConnect = require("./config/db")
// crear servidor
const app = express()

// Conectar a la DB
dbConnect()

// Puerto de la app
const port = process.env.Port || 4000

// Habilitar leer valores de un body
app.use(express.json())

console.log("NodeSend starting...")

// Rutas de la app
app.use("/api/users", require("./routes/users"))
app.use("/api/auth", require("./routes/auth"))

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`)
})
