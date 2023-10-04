const express = require("express")
const cors = require('cors');
const sendRequests = require('./mock_server/mock_server.js')
const app = express()

const PORT = process.env.PORT|| 4000

sendRequests();

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})