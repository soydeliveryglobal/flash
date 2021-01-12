/*
    KB Genexus, "Store"
*/
const axios = require('./axios')

const dfsApi = 'https://testapps.desarrollodesoftwareamedida.com/teststore/rest/delfasport/dfs80026'
// const dfsApi = 'https://apps.delfasoft.com/store/rest/delfasport/dfs80026'

module.exports = (req, payment) => new Promise ((resolve, reject) => {

    console.log({ // Registra el Pago
        FromUser: req.body.fromUser,
        FromCompra: req.body.fromCompra,
        fromPagoIn: req.body.pago,
        pagoResponse: JSON.stringify(payment)
    })

    
    // envio a la Kb store
    axios
    .post(dfsApi, { // Registra el Pago
        FromUser: req.body.fromUser,
        FromCompra: req.body.fromCompra,
        fromPagoIn: req.body.pago,
        pagoResponse: JSON.stringify(payment)
    }, {
        headers: {
            'user-agent': req.get('User-Agent'),
            'Content-Type': 'application/json;charset=UTF-8',
            origin: req.get('origin')
        }
    })
    .then(response => {
        resolve(response.data)
    }) // devuelve tal cual
    .catch(error => { // error al consumir la api de genexus
        console.error(error)
        reject({
            ErrorSDT: {
                ErrorCode: 999,
                ErrorDescription: `Error en la api ${dfsApi} ${error}`
            },
            mensaje: error
        })
    })
})