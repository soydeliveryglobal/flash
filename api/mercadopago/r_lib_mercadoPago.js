/*
    💳 Mercado Pago
*/

const mercadopago = require('mercadopago')
// const access_token = 'TEST-5463981015933679-010916-82b2e7284aa26b478dfe5657829e45fb__LC_LD__-284446415'
const access_token = 'APP_USR-5463981015933679-010916-149ff2a0e17cc5a8a24dc8a40ff83b8f__LA_LD__-284446415'
mercadopago.configurations.setAccessToken(access_token)


module.exports = (entrada) => new Promise ((resolve, reject) => {

    mercadopago.payment.save(entrada)
    .then(payment => {
        resolve(payment)
    })
    .catch(error => {
        console.warn(error)
        reject({
            ErrId: 99,
            ErrDescription:error.toString()
        })
    })
})