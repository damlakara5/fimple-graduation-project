const express = require("express")
const mongoose = require("mongoose")
const dotenv = require('dotenv');
const cors = require('cors');
const applicationRouter = require("./routes/applicationRoutes")
const adminRouter = require("./routes/adminRoutes")

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE

mongoose.connect(DB).then(con => { console.log("DB connection successfull")})



const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.get("/", (req,res) => {
    console.log("hello")
})


app.use("/application", applicationRouter)
app.use("/admin", adminRouter)

const server = app.listen(port, () => {
    console.log("listening")
})


module.exports = server