export default (form) => new Promise ((resolve, reject) => {
    window.Mercadopago.createToken(form, (status, response) => {
        if (status === 200) {
            console.log(response)
            resolve(response)
        } else {
            console.log(response)

            reject(`Verifique los datos: ${response.cause.map(causa => {
                switch (causa.code) {
                    case 'E301': return 'Tarjeta inválida'
                    case 'E302': return 'Código de seguridad no válido'
                    case '205': return 'Titular vacío'
                    case '208': return 'Mes vacío'
                    case '209': return 'Año vacío'
                    case '325': return 'Mes no válido'
                    case '326': return 'Año no válido'
                    default: return `error ${causa.code}: ${causa.description}`
                }
            }).join(', ')}`)
        }
    })
})