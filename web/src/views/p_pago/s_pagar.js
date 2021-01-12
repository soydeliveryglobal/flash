import s_token from "./s_token"

export default async (componente) => {
     window.event.$emit('showSpinner', true)

    // Formateo datos
    componente.error = null
    const form = document.createElement("form")
    Object.entries(componente.form).map(campo => {
        const input = document.createElement("input")
        input.setAttribute('data-checkout', campo[0])
        input.value = campo[1]
        form.appendChild(input)
    })

    // Obtengo Token, realizo pago, y muestro mensaje
    try {
        let datosPago = {}
        if(!componente.datosQuery.status){
            componente.paymentMethodId = await s_token(form)
            datosPago = {
                tipoCompra: 2,
               pago: {
                   transaction_amount: componente.tarifa,
                   token: componente.paymentMethodId.id,
                   description: 'Envío OnDemand',
                   installments: 1, // Número de cuotas
                   payment_method_id: componente.paymentType[0].id,
                  //  ⛔ issuer_id: '1', ⛔ Este campo es para pagar con cuotas
                   payer: {
                       email: componente.form.email
                   }
               }
            }
        }else{
            datosPago = {
                tipoCompra: 1,
              
            }
        }
        
        // if(!componente.datosQuery.status)
        //     datosPago.pago = {
        //         tipoCompra: 2,
        //         transaction_amount: componente.tarifa,
        //         token: componente.paymentMethodId.id,
        //         description: 'Envío OnDemand',
        //         installments: 1, // Número de cuotas
        //         payment_method_id: componente.paymentType[0].id,
        //         // ⛔ issuer_id: '1', ⛔ Este campo es para pagar con cuotas
        //         payer: {
        //             email: componente.form.email
        //         }
        //     }
        let res = await componente.$store.dispatch('iniciarPago', datosPago)
        console.log(res)
        if(res){
            componente.pago = false
            componente.form = {
                email: null,
                cardNumber: null,
                securityCode: null,
                cardExpirationMonth: null,
                cardExpirationYear: null,
                cardholderName: null,
                docType: 'CI',
                docNumber: null
            }
        }

        componente.pagando = false
        window.event.$emit('showSpinner', false)



    } catch (error) {
        window.event.$emit('showSpinner', false)
        window.event.$emit('showError', error)
        componente.pagando = false
        console.log(error)
        //componente.pagando = false
        componente.error = error
    }
}