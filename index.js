const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config({ path: "./.env" })
const path = require("path")
const app = express()

// middlewares
app.use(express.json())
app.use(express.static("uploads"))
app.use(express.static("dist"))
app.use(cookieParser())
app.use(cors({
    origin: "https://holiday-9j9u.onrender.com"
    ,
    credentials: true
}))
// route
app.use("/api/auth", require("./routes/authRoute"))
app.use("/api/admin", require("./routes/adminRoute"))
app.use("/api/public", require("./routes/publicRoute"))
app.use("/api/order", require("./routes/orderRoute"))
// 404
app.use("*", (req, res) => {
    res.sendFile(path.json(__dirname, "dist", "index.html"))
    // res.status(404).json({ message: "Resource Not Found" })
})
// error handler
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: err.message || "Something Went Wrong" })
})
// db
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("Mongo Connected")
    app.listen(process.env.PORT, console.log("SERVER RUNNING"))
})


// mongodb+srv://komalkshirsagar32009:rRxfOQJVUcu2lXMX@cluster0.g5tlf77.mongodb.net/?retryWrites=true&w=majority