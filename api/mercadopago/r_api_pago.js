/*
    💳 Pago
*/

/* salida de api */
module.exports = (router) => {
    router.post('/mercadopago', async (req, res) => {

        /*  KB Genexus, Api Mercado Pago, KB Genexus*/
        try {
            const mercadoPago = await require('./r_lib_mercadoPago')(req.body)
            res.send(mercadoPago)
        } catch (error) {
            res.send(error)
        }
    })
}