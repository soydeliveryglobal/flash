import axios  from 'axios';
import config from './config';
axios.defaults.crossDomain = true
axios.defaults.withCredentials = true
//Url general de los servicios
export const API_URL_BACKEND = `${process.env.API_URL}`;

export const  apiHttp = async (verb, endpoint, data, params = {}) => {

    const configuracion={...config}

	if(Object.keys(params).length !==0 ){
		configuracion.params = params;
	}
	verb = verb.toUpperCase();
	// const respuestapeticion= {...respuesta}s
	switch (verb) {
	case 'GET':
		try {
			const promesa = axios.get(`${API_URL_BACKEND}${endpoint}`, configuracion)
			const [respuestaPromesa] = await Promise.all([promesa]);
			// respuestapeticion.ok      = respuestaPromesa.data.ErrId===0;
			// respuestapeticion.mensaje.codigo = respuestaPromesa.data.ErrId;
			// respuestapeticion.mensaje.descripcion = respuestaPromesa.data.datos.ErrDescription;
			return respuestaPromesa.data;//respuestapeticion;
		}
		catch (error) {
			return error_respuesta(error);
		}
	case 'POST':
		try {
			const inputData = await data;
			const promesa = axios.post(`${API_URL_BACKEND}${endpoint}`, inputData, configuracion);
			const [respuestaPromesa] = await Promise.all([promesa]);
			// respuestapeticion.ok      = true;
			// respuestapeticion.mensaje = respuestaPromesa.data.mensaje;
			// respuestapeticion.datos   = respuestaPromesa.data.datos
			return respuestaPromesa.data;//respuestapeticion;
		}
		catch (error) {
			return error_respuesta(error)
		}
	case 'PUT':
		try {
			const inputData = await data;
			const promesa = axios.put(`${API_URL_BACKEND}${endpoint}`, inputData, configuracion);
			const [respuestaPromesa] = await Promise.all([promesa]);
			// respuestapeticion.ok      = true;
			// respuestapeticion.mensaje = respuestaPromesa.data.mensaje;
			// respuestapeticion.datos   = respuestaPromesa.data.datos;
			return respuestaPromesa.data;//respuestapeticion;
		}
		catch (error) {
			return error_respuesta(error)
		}
	case 'DELETE':
		try {
			const promesa = axios.delete(`${API_URL_BACKEND}${endpoint}`, configuracion)
			const [respuestaPromesa] = await Promise.all([promesa]);
			// respuestapeticion.ok      = true;
			// respuestapeticion.mensaje = respuestaPromesa.data.mensaje;
			return respuestaPromesa.data;//respuestapeticion;
		}
		catch (error) {
			return error_respuesta(error);
		}
	}
};

export const  apiHttpMercado = async (verb, endpoint, data, params = {}) => {

    const configuracion={...config}

	if(Object.keys(params).length !==0 ){
		configuracion.params = params;
	}
	verb = verb.toUpperCase();
	// const respuestapeticion= {...respuesta}s
	switch (verb) {
	case 'GET':
		try {
			const promesa = axios.get(`${process.env.API_URL_MERCADO}${endpoint}`, configuracion)
			const [respuestaPromesa] = await Promise.all([promesa]);
			// respuestapeticion.ok      = respuestaPromesa.data.ErrId===0;
			// respuestapeticion.mensaje.codigo = respuestaPromesa.data.ErrId;
			// respuestapeticion.mensaje.descripcion = respuestaPromesa.data.datos.ErrDescription;
			return respuestaPromesa.data;//respuestapeticion;
		}
		catch (error) {
			return error_respuesta(error);
		}
	case 'POST':
		try {
			const inputData = await data;
			const promesa = axios.post(`${process.env.API_URL_MERCADO}${endpoint}`, inputData, configuracion);
			const [respuestaPromesa] = await Promise.all([promesa]);
			console.log(respuestaPromesa)
			// respuestapeticion.ok      = true;
			// respuestapeticion.mensaje = respuestaPromesa.data.mensaje;
			// respuestapeticion.datos   = respuestaPromesa.data.datos
			return respuestaPromesa.data;//respuestapeticion;
		}
		catch (error) {
			console.log(error)
			return error_respuesta(error)
		}
	case 'PUT':
		try {
			const inputData = await data;
			const promesa = axios.put(`${process.env.API_URL_MERCADO}${endpoint}`, inputData, configuracion);
			const [respuestaPromesa] = await Promise.all([promesa]);
			// respuestapeticion.ok      = true;
			// respuestapeticion.mensaje = respuestaPromesa.data.mensaje;
			// respuestapeticion.datos   = respuestaPromesa.data.datos;
			return respuestaPromesa.data;//respuestapeticion;
		}
		catch (error) {
			return error_respuesta(error)
		}
	case 'DELETE':
		try {
			const promesa = axios.delete(`${process.env.API_URL_MERCADO}${endpoint}`, configuracion)
			const [respuestaPromesa] = await Promise.all([promesa]);
			// respuestapeticion.ok      = true;
			// respuestapeticion.mensaje = respuestaPromesa.data.mensaje;
			return respuestaPromesa.data;//respuestapeticion;
		}
		catch (error) {
			return error_respuesta(error);
		}
	}
};

// para consumir servicios que requieran autenticación unicamente del token de sistema
// export const apiHttpSis = async (verb, endpoint, data, params = {}) => {
// 	const configuracion={...config}
// 	if(Object.keys(params).length !==0 ){
// 		configuracion.params = params;
// 	}

// 	const TokSis =  store.state['mSesion'].sesion.tokSistema;
// 	configuracion.headers.Authorization = `Bearer ${TokSis}`; //falta configurar tipo de autorizacion y el metodo de encriptado
// 	verb = verb.toUpperCase();
// 	const respuestapeticion= {...respuesta}
// 	switch (verb) {
// 	case 'GET':
// 		try {
// 			const promesa = axios.get(`${API_URL_BACKEND}${endpoint}`, configuracion)
// 			const [respuestaPromesa] = await Promise.all([promesa]);
// 			respuestapeticion.ok      = true;
// 			respuestapeticion.mensaje = respuestaPromesa.data.mensaje;
// 			respuestapeticion.datos   = respuestaPromesa.data.datos
// 			return respuestapeticion;
// 		}
// 		catch (error) {
// 			return error_respuesta(error);
// 		}
// 	case 'POST':
// 		try {
// 			const inputData = await data;
// 			const promesa = axios.post(`${API_URL_BACKEND}${endpoint}`, inputData, configuracion);
// 			const [respuestaPromesa] = await Promise.all([promesa]);
// 			respuestapeticion.ok      = true;
// 			respuestapeticion.mensaje = respuestaPromesa.data.mensaje;
// 			respuestapeticion.datos   = respuestaPromesa.data.datos
// 			return respuestapeticion;
// 		}
// 		catch (error) {
// 			return error_respuesta(error)
// 		}
// 	case 'PUT':
// 		try {
// 			const inputData = await data;
// 			const promesa = axios.put(`${API_URL_BACKEND}${endpoint}`, inputData, configuracion);
// 			const [respuestaPromesa] = await Promise.all([promesa]);
// 			respuestapeticion.ok      = true;
// 			respuestapeticion.mensaje = respuestaPromesa.data.mensaje;
// 			respuestapeticion.datos   = respuestaPromesa.data.datos;
// 			return respuestapeticion;
// 		}
// 		catch (error) {
// 			return error_respuesta(error)
// 		}
// 	case 'DELETE':
// 		try {
// 			const promesa = axios.delete(`${API_URL_BACKEND}${endpoint}`, configuracion)
// 			const [respuestaPromesa] = await Promise.all([promesa]);
// 			respuestapeticion.ok      = true;
// 			respuestapeticion.mensaje = respuestaPromesa.data.mensaje;
// 			return respuestapeticion;
// 		}
// 		catch (error) {
// 			return error_respuesta(error);
// 		}
// 	}
// };


function error_respuesta(error){
	// window.getApp.$emit('CERRAR_ESPERE');
	const respuestapeticion= {...respuesta}
	if(error.response){
		respuestapeticion.ok                  = false;
		respuestapeticion.ErrId      = '999';
		respuestapeticion.ErrDescription = 'Error General de la Aplicación';
					// respuestapeticion.mensaje.codigo = respuestaPromesa.data.ErrId;
			// respuestapeticion.mensaje.descripcion = respuestaPromesa.data.datos.ErrDescription;
		return respuestapeticion;
		// if(error.response.status){
		// 	if (typeof error.response.data.mensaje === 'undefined'){
		// 		respuestapeticion.ok                  = false;
		// 		respuestapeticion.mensaje.codigo      = '999';
		// 		respuestapeticion.mensaje.descripcion = 'Error General de la Aplicación';
		// 			// respuestapeticion.mensaje.codigo = respuestaPromesa.data.ErrId;
		// 	// respuestapeticion.mensaje.descripcion = respuestaPromesa.data.datos.ErrDescription;
		// 		return respuestapeticion;
		// 	}
		// 	else
		// 	if (error.response.status === 404){
		// 		respuestapeticion.ok                  = false;
		// 		respuestapeticion.mensaje.codigo      = '999';
		// 		respuestapeticion.mensaje.descripcion = 'Servicio no disponible.'
		// 		return respuestapeticion;
		// 	}
		// 	else
		// 	if (error.response.status === 405 || error.response.status === 406){
		// 		respuestapeticion.ok                  = false;
		// 		respuestapeticion.mensaje.codigo      = '999';
		// 		respuestapeticion.mensaje.descripcion = 'Operación no permitida.'
		// 		return respuestapeticion;
		// 	}
		// 	else
		// 	if( error.response.data.mensaje.codigo == '001'){
		// 		// store.dispatch('mSesion/cierreSesion',1)
		// 		//store.dispatch('cierreSesion',null, {root:true})
		// 		// const mensaje = {
		// 		// 	tipo: 'advertencia',
		// 		// 	mensaje: error.response.data.mensaje.descripcion
		// 		// }
		// 		// window.getApp.$emit('MOSTRAR_MENSAJE', mensaje);
		// 	}
		// 	else
		// 	if (typeof error.response === 'undefined'){
		// 		respuestapeticion.ok                  = false;
		// 		respuestapeticion.mensaje.codigo      = '999';
		// 		respuestapeticion.mensaje.descripcion = 'Error General de la Aplicación';
		// 		return respuestapeticion;
		// 	}
		// }

	}
	else
	if (error.message == 'Network Error'){
		// const mensaje = {
		// 	tipo: 'network', // crear mensaje con icono de network
		// 	mensaje: 'Verifica tu enlace a la red e inténtalo nuevamente.'
		// }
		// window.getApp.$emit('MOSTRAR_MENSAJE', mensaje);
		respuestapeticion.ok                  = false;
		respuestapeticion.ErrId      = '444';
		respuestapeticion.ErrDescription = 'Network Error'
		return respuestapeticion;
	}
	else
	{
		respuestapeticion.ok                  = false;
		respuestapeticion.ErrId      = '999';
		respuestapeticion.ErrDescription = 'Error General de la Aplicación';
		return respuestapeticion;
	}

}
let respuesta = {
	'ok': false,
	'ErrId': '',
	'ErrDescription': ''
};