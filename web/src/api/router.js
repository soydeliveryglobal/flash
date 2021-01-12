import {
	apiHttp, apiHttpMercado,
} from './axiosApi.js';


/**
 *  @description Servicio de autenticación y generación de token
 *  @author  Guillermo Giménez <gg091195@gmail.com> 30/05/2019
 *  @returns {object} respuesta
 */
export const apiToken = (datos) => {
	return apiHttp('POST', `sdws_autenticar`, datos)
}

/**
 *  @description Servicio que determina si es viable solicitar un pedido express.
 *  @author  Guillermo Giménez <gg091195@gmail.com> 05/06/2019
 *  @returns {object} respuesta
 */
export const apiValidarExpress = (datos) => {
	return apiHttp('POST',`sdws_validarexpress`, datos)
}

/**
 *  @description Servicio que determina si es viable solicitar un pedido express.
 *  @author  Guillermo Giménez <gg091195@gmail.com> 05/06/2019
 *  @returns {object} respuesta
 */
export const apiNegocioVehiculoTipo = (datos) => {
	return apiHttp('POST',`sdws_negociovehiculostipo`, datos)
}

/**
 *  @description Servicio que determina si es viable solicitar un pedido express.
 *  @author  Guillermo Giménez <gg091195@gmail.com> 05/06/2019
 *  @returns {object} respuesta
 */
export const apiNegocioFranjas = (datos) => {
	return apiHttp('POST',`sdws_negociofranjas`, datos)
}

/**
 *  @description Servicio que determina si es viable solicitar un pedido express.
 *  @author  Guillermo Giménez <gg091195@gmail.com> 05/06/2019
 *  @returns {object} respuesta
 */
export const apiObtenerTarifa = (datos) => {
	return apiHttp('POST',`sdws_negociosucursaltarifas`, datos)
}

/**
 *  @description Servicio que determina si es viable solicitar un pedido express.
 *  @author  Guillermo Giménez <gg091195@gmail.com> 05/06/2019
 *  @returns {object} respuesta
 */
export const apiPagoMercadoPago = (datos) => {
	return apiHttpMercado('POST',`/mercadopago`, datos)
}

/**
 *  @description Servicio que determina si es viable solicitar un pedido express.
 *  @author  Guillermo Giménez <gg091195@gmail.com> 05/06/2019
 *  @returns {object} respuesta
 */
export const apiAltaPago = (datos) => {
	return apiHttp('POST',`/sdws_nuevopedidoflash`, datos)
}

