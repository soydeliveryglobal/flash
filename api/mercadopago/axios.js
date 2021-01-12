/*
    🔌 Conectando con Kb Store
*/

const axios = require('axios')
axios.defaults.crossDomain = true
axios.defaults.withCredentials = true

module.exports = axios