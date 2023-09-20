require("express-async-errors")
require("dotenv").config()
const express = require("express")
const app = express()
const helmet = require("helmet")
const fileUpload = require("express-fileupload")
const cloudinary = require("cloudinary").v2
const cors = require("cors")
const path = require("path")

//config pour l'upload de fichiers
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

// middlewares
const notFound = require("./middlewares/notFoundMiddleware.js")
const errorHandler = require("./middlewares/errorHandlerMiddleware.js")

// routers
const authRouter = require("./routes/authRoutes.js")
const articleRouter = require("./routes/articleRoutes.js")
const userRouter = require("./routes/userRoutes.js")
const favorisRouter = require("./routes/favorisRoutes.js")

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: { "img-src": ["'self'", "https://console.cloudinary.com/"] },
  })
)
app.use(cors())
app.use(express.json())

//gestion des fichier temp
app.use(fileUpload({ useTempFiles: true }))
app.use(express.static(path.resolve(__dirname, "./client/dist")))
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/article", articleRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/favoris", favorisRouter)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist/index.html"))
})

app.use(notFound)
app.use(errorHandler)

const port = 5000
app.listen(port, () => console.log(`Server is listening on ${port}...`))
