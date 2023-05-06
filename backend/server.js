require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser');

const app = express()

const Router = require("./routes/route")

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());

app.use(cors())
// parse requests of content-type - application/json
app.use(express.json())
// parse requests of content-type - application/x-www-form-urlencoded
const port = process.env.TOKEN_SERVER_PORT
//get the port number from .env file

app.use(express.urlencoded({ extended: true }))
// simple route
app.use("/", Router)
// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})