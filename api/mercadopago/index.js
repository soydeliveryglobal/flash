/*
    🥕 Backend
*/
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('./cors')

// aplicación
const app = express()
app.use(bodyParser.json())
app.use(cors)

const router = express.Router()

// Mercado Pago
const r_api_pago = require('./r_api_pago')
r_api_pago(router)

app.use(router)

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`http://localhost:${port}`));