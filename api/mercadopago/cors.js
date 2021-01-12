/*
    👮‍ Cors
*/
const cors = require('cors')

module.exports = cors({
    origin: [
        'http://localhost:8080',
        'http://localhost:8081',
        'https://testdelfawebs.desarrollodesoftwareamedida.com',
        'https://www.flashsoydelivery.com.uy',
    ],
    exposedHeaders: ['Content-Type', 'Accept', 'X-Requested-With'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
})
