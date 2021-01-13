import Vue from 'vue'
import Vuex from 'vuex'
import router from './../router'
import moment from 'moment-timezone'
import { apiNegocioFranjas, apiNegocioVehiculoTipo, apiToken, apiValidarExpress, apiObtenerTarifa, apiPagoMercadoPago, apiAltaPago } from './../api/router'

Vue.use(Vuex)

const NEGOCIOID = 10;//3680;
const SUCURSALID = 2;//1;
const NEGOCIOCLAVE = 1990;
// const NEGOCIOAPIID =52189964;
// const APIKEY = 'ZBVpOqHHTkQSVSdeRIKXZj6W2glkEgQo';

let initSteps = [
	{id:1,title:'Lugar de retiro',subtitle:'Introduzca el lugar donde se RETIRARÁ la mercancía.<br>Presione la flecha para continuar',name:'1', view:'origen', active:true, 
		data:{
			lat: null,
			lng:null,
			address: null,
			departamento: null,
			localidad: null,
			street: null,
			streetNumber: null,
			streetNumberConfirmation: null
		}, 
		dataValid:{
			coords:{
				touch: false
			},
			address: {
				touch: false
			},
			streetNumberConfirmation: {
				touch: false,
				min:1
			}

		}, valid:false},
	{id:2,title:'Lugar de envío',subtitle:'Introduzca el lugar donde se ENVIARÁ la mercancía.<br>Presione la flecha para continuar',name:'2', view:'destino', active:false, 
		data:{
			lat: null,
			lng:null,
			address: null,
			departamento: null,
			localidad: null,
			street: null,
			streetNumber: null,
			streetNumberConfirmation: null
		}, 
		dataValid:{
			coords:{
			touch: false
			},
			address: {
				touch: false
			},
			streetNumberConfirmation: {
				touch: false,
				min:1
			}
		}, valid:false},
	{
		id:3,title:'Tipo de envío',subtitle:'Seleccione el VEHÍCULO, la FECHA y la FRANJA HORARIA que desee. <br>Presione la flecha para continuar',name:'3', view:'Tipo de envío', active:false, valid: false,
		data:{deliveryType:1,vehicleType:null,serviceDate:moment().format('YYYY-MM-DD'), schedule:null, observacionOrigen:null,observacionDestino:null }, 
		dataValid:{
			deliveryType: {
				min:1, 
				max:2, 
				touch: false, 
				dirty: false
			}, 
			vehicleType:{
				min:1, 
				touch: false, 
				dirty: false
			},
			serviceDate:{
				min:moment().tz("America/Montevideo").unix(), 
				touch: false, 
				dirty: false
			},
			schedule:{
				min: 1, 
				touch: false, 
				dirty: false
			},
			observacionOrigen: {
				touch: false,
			},
			observacionDestino: {
				touch: false,
			}
		}
	},
	{
		id:4,title:'Pago',subtitle:'Introduzca los datos para el pago del servicio',name:'4', view:'Pago', active:false, 
		data:{
			firstname: null,
			lastname: "",
			email: null,
			phone: null,
			rut: null
		},
		dataValid:{
			firstname: {touch:false, min:2},
			lastname: {touch:false, min:2},
			email: {touch:false, min:2},
			phone: {touch:false, min:8},
			rut: {touch: false, min:8}
		}, valid:false},
	]

export default new Vuex.Store({
state: {
	steps: [...initSteps],
	token: null,
	vehiculos:[],
	franjas:[],
	Express: true,
	tarifa: null,
	datosQuery: {
		Negocio_Cliente: '',
		ApiId: '',
		ApiKey: '',
		Nombre_Cliente: '',
		Rut: '',
		email: '',
		Telefono_cliente: '',
		mercadopago: 'n',
		status: false
	},
	approved: false
},
mutations: {
	setSteps (state, {steps}) {
		state.steps = steps
	},
	setToken (state, token){
		state.token = token
	},
	setVehiculos (state,vehiculos){
		state.vehiculos = [...vehiculos]
	},
	setFranjas (state,franjas){
		state.franjas = [...franjas]
	},
	setExpress (state,payload){
		state.Express = payload
	},
	setTarifa (state,payload){
		state.tarifa = parseInt(payload)
	},
	resetSteps(state){
		state.steps = [...initSteps]
	},
	resetToken(state){
		state.token = null
	},
	setDatosQuery(state, datos){
		state.datosQuery = {...datos}
	},
	setApproved(state){
		state.approved = true
	},
	cleanApproved(state){
		state.approved = false
	}
},
actions: {
	async avanzar ({ commit, state, dispatch }, view) {
		// if(state.datosQuery.status){
			const steps = [...state.steps]
			if(view==1){
			let auxSteps = steps.filter(x=>x.valid&&(x.id==1));

			if(auxSteps.length==1){
				steps.find(x=>x.active).active=false
				steps.find(x=>x.id==view+1).active=true
				router.push({name: steps.find(x=>x.id==view+1).view})
			}

			}
		else
		if(view==2){
			// window.event.$emit('showSpinner', true)

			let auxSteps = steps.filter(x=>x.valid&&(x.id==1||x.id==2));

			if(auxSteps.length==2){
				let res1 =  await dispatch('getVehiculos');
				let res3 = await dispatch('getValidExpress');
				if(res1&&res3){
					steps.find(x=>x.active).active=false
					steps.find(x=>x.id==view+1).active=true
	
					router.push({name: steps.find(x=>x.id==view+1).view})
				}
				
			}
			// window.event.$emit('showSpinner', false)


		}
		else
		if(view==3){
			let auxSteps = steps.filter(x=>x.valid&&(x.id==1||x.id==2||x.id==3));

			if(auxSteps.length==3){
				// window.event.$emit('showSpinner', true)
				
				let res = await dispatch('getTarifa')
				if(res){

					steps.find(x=>x.active).active=false
					steps.find(x=>x.id==view+1).active=true
					router.push({name: steps.find(x=>x.id==view+1).view})
				}
				// window.event.$emit('showSpinner', false)


			}

		}  
		else
		if(view==4){
			let auxSteps = steps.filter(x=>x.valid&&(x.id==1||x.id==2||x.id==3||x.id==4));

			if(auxSteps.length==4){
				// steps.find(x=>x.active).active=false
				// steps[view-1].active=true
				// router.push({name: steps[view-1].view})

			}

		}
		commit('setSteps', { steps: [...steps] })
		// }else{
		// 	window.event.$emit('showError', 'PRÓXIMAMENTE ...')

		// }
		

	},
	async ir ({ commit, state, dispatch }, view) {
		// if(state.datosQuery.status){
			const steps = [...state.steps]

			if(view==1){
			let auxSteps = steps.filter(x=>x.valid&&(x.id==1));
	
			if(auxSteps.length==1){
				steps.find(x=>x.active).active=false
				steps[view-1].active=true
				router.push({name: steps[view-1].view})
			}
	
			}
			else
			if(view==2){
				let auxSteps = steps.filter(x=>x.valid&&(x.id==1||x.id==2));
		
				if(auxSteps.length==2){
					steps.find(x=>x.active).active=false
					steps[view-1].active=true
					router.push({name: steps[view-1].view})
		
				}
	
			}
			else
			if(view==3){
				let auxSteps = steps.filter(x=>x.valid&&(x.id==1||x.id==2||x.id==3));
		
				if(auxSteps.length==3){
					steps.find(x=>x.active).active=false
					steps[view-1].active=true
					await Promise.all[dispatch('getVehiculos'), dispatch('getFranjas'), dispatch('getValidExpress')];
		
		
					router.push({name: steps[view-1].view})
	
			}
	
			}  
			else
			if(view==4){
				let auxSteps = steps.filter(x=>x.valid&&(x.id==1||x.id==2||x.id==3||x.id==4));
		
				if(auxSteps.length==4){
					steps.find(x=>x.active).active=false
					steps[view-1].active=true
					let res = await dispatch('getTarifa')
					if(res){
						router.push({name: steps[view-1].view})
					}
		
				}
	
			}
			
			// let active = steps.findIndex(x=>x.active)
			// steps[active].valid = true //borrar
			// if((step==active+1||step==active-1) && steps[active].valid){
			//   steps[step].active = true
			//   steps[active].active = false
			//   res=true
			// }
	
			commit('setSteps', { steps: [...steps] })
		// }
		// else{
		// window.event.$emit('showError', 'PRÓXIMAMENTE ...')

		// }

	},
	async getToken({commit, state}){

		let data = {
			ApiId: state.datosQuery.ApiId,
			ApiKey: state.datosQuery.ApiKey
		}
	
		let response = await apiToken(data)

		if(parseInt(response.ErrId)===0){
			// if(!state.datosQuery.status){
			// 	window.event.$emit('showError', 'PRÓXIMAMENTE ...')
			// }
			commit('setToken',response.AccessToken);
		}
		else{
			window.event.$emit('showError', response.ErrDescription)
		}
	},

	async getVehiculos({commit, state}){

		let data = {
			AccessToken: state.token,
			NegocioId: NEGOCIOID,
			NegocioSucursalId: SUCURSALID,
			FechHra: moment().format('YYYY-MM-DD HH:mm'),
			Origen: `${state.steps.find(x=>x.id==1).data.lat}, ${state.steps.find(x=>x.id==1).data.lng}`,
			Destino: `${state.steps.find(x=>x.id==2).data.lat}, ${state.steps.find(x=>x.id==2).data.lng}`
		}
		
		let response = await apiNegocioVehiculoTipo(data)
	
		if(parseInt(response.ErrId)===0){
			commit('setVehiculos',response.sdtODGetTipoVehiculo);
			return true
		}
		else
		if(parseInt(response.ErrId)==11){
			commit('resetSteps');
			commit('resetToken');
			window.event.$emit('showError', response.ErrDescription)
			router.push({name: 'origen'})
			return false
		}
		else{
			window.event.$emit('showError', response.ErrDescription)
			return false
		}
	},

	async getFranjas({commit, state}, fecha=""){

		let data = {
			AccessToken: state.token,
			NegocioId:  NEGOCIOID,
			NegocioSucursalId:  SUCURSALID,
			FechHra: moment().format('YYYY-MM-DD HH:mm'),

		}
		if(fecha!="")
			data.FechHra = moment(fecha).format('YYYY-MM-DD HH:mm')


		let response = await apiNegocioFranjas(data)
		
		if(parseInt(response.ErrId)===0){
			commit('setFranjas',response.sdtODGetFranjas);
			return true
		}
		else
		if(parseInt(response.ErrId)==11){
			commit('resetToken');
			commit('resetSteps');
			window.event.$emit('showError', response.ErrDescription)
			router.push({name: 'origen'})
			commit('setFranjas', []);

			return false
		}
		else{
			window.event.$emit('showError', response.ErrDescription)
			commit('setFranjas',[]);

			return false
		}
	},

	async getValidExpress({commit,dispatch,state}){
		
		let data = {
			AccessToken: state.token,
			NegocioId: NEGOCIOID,
			NegocioSucursalId: SUCURSALID,
		}
	
		let response = await apiValidarExpress(data)
		
		if(parseInt(response.ErrId)===0){
			commit('setExpress',response.Express==='S');
			if(response.Express==='S')
				await dispatch('getFranjas');
			return true
		}
		else
		if(parseInt(response.ErrId)==11){
			commit('resetToken');
			window.event.$emit('showError', response.ErrDescription)
			commit('resetSteps');
			router.push({name: 'origen'})
			return false
		}
		else{
			window.event.$emit('showError', response.ErrDescription)
			return false
		}
		
	},

	async getTarifa({commit,state}){

		let data = {
			AccessToken: state.token,
			NegocioId: NEGOCIOID,
			NegocioSucursalId: SUCURSALID,
			NegocioTipoVehiculoId: state.steps.find(x=>x.id==3).data.vehicleType,
			Origen: `${state.steps.find(x=>x.id==1).data.lat}, ${state.steps.find(x=>x.id==1).data.lng}`,
			Destino: `${state.steps.find(x=>x.id==2).data.lat}, ${state.steps.find(x=>x.id==2).data.lng}`
		}

		let response = await apiObtenerTarifa(data)
		if(parseInt(response.ErrId)===0){
			commit('setTarifa',response.Tarifa);
			return true
		}
		else
		if(parseInt(response.ErrId)==11){
			commit('resetToken');
			commit('resetSteps');
			window.event.$emit('showError', response.ErrDescription)
			router.push({name: 'origen'})
		}
		else{
			window.event.$emit('showError', response.ErrDescription)
		}
		
		return false
	},

	async validateData({commit, state, dispatch}, payload){
		
		let res = false

		const steps = [...state.steps]
		
		let step = steps.find(x=>x.id==payload.id)
	
		step.valid=true
		step.data={...payload.data}
		
		commit('setSteps', { steps: [...steps] })
		
		if(payload.id == 4){
			let response = await dispatch('altaPago', 1)
			if(response){
				res=true
			}
		}else{
			res = true
		}

		return res
	},

	async iniciarMercadoPago({ state}, payload){
		
		let data = {
			...payload
		}

		data.transaction_amount = state.tarifa
	
		let response = await apiPagoMercadoPago(data)
		
		if(parseInt(response.ErrId)===99){
			window.event.$emit('showError', response.ErrDescription)
			return false
		}
		else{
			return response
		}
	},
	async iniciarPago({dispatch}, payload){
		switch(payload.tipoCompra){
			case 1:{

				let res = await dispatch('altaPago', 2)
				if(res.ok){
					//router.push({name: 'Aprobación de pago'})
					return res.ok
				}
				// else{
				// 	Error_desc
				// }

				break;
			}

				
			case 2:{
				console.log('inicia mercado pago')

				let resMP = await dispatch('iniciarMercadoPago', payload.pago)
				console.log(resMP);
				if(resMP.response.status!='rejected'){
					
					let res = await dispatch('altaPago',2)


					if(res.ok){
						//router.push({name: 'Aprobación de pago'})
						return res.ok
					}
	
				}
				else {
					switch(resMP.response.status_detail){
						case 'cc_rejected_insufficient_amount':{
							window.event.$emit('showError', 'Su pago ha sido rechazado: Monto insuficiente.')
							break
						}
						case 'cc_rejected_high_risk':{
							window.event.$emit('showError', 'Su pago ha sido rechazado: Tu pago fue rechazado. \n Elige otro de los medios de pago, te recomendamos con medios en efectivo.')
							break
						}
						case 'cc_rejected_bad_filled_card_number':{
							window.event.$emit('showError', 'Su pago ha sido rechazado: Revisa la fecha de vencimiento.')
							break
						}
						case 'cc_rejected_bad_filled_other':{
							window.event.$emit('showError', 'Su pago ha sido rechazado: Revisa los datos.')
							break
						}
						case 'cc_rejected_bad_filled_security_code':{
							window.event.$emit('showError', 'Su pago ha sido rechazado: Revisa el código de seguridad de la tarjeta.')
							break
						}
						case 'cc_rejected_blacklist':{
							window.event.$emit('showError', 'Su pago ha sido rechazado: No pudimos procesar tu pago.')
							break
						}
						case 'cc_rejected_duplicated_payment':{
							window.event.$emit('showError', 'Su pago ha sido rechazado: Ya hiciste un pago por ese valor. \nSi necesitas volver a pagar usa otra tarjeta u otro medio de pago.')
							break
						}
						case 'cc_rejected_max_attempts':{
							window.event.$emit('showError', 'Su pago ha sido rechazado: Llegaste al límite de intentos permitidos.\nElige otra tarjeta u otro medio de pago.')
							break
						}
						default: {
							window.event.$emit('showError', 'Su pago ha sido rechazado: Intente nuevamente.')
							break
						}
					}
					
				}

			break;
			}

				
		}
	},

	async altaPago({state, commit}, tipo){
		let step1 = state.steps.find(x=> x.id==1).data;
		let step2 = state.steps.find(x=> x.id==2).data;
		let step3 = state.steps.find(x=> x.id==3).data;
		let step4 = state.steps.find(x=> x.id==4).data;

		let dataAlta = {
			"Negocio_id": NEGOCIOID,//NEGOCIOID,
			"Negocio_Cliente": state.datosQuery.Negocio_Cliente,
			"Negocio_clave": NEGOCIOCLAVE,//"CUALESTE",
			"Negocio_RepartidoId": 0,
			"Nombre_cliente": `${step4.firstname} ${step4.lastname}`.trim(),
			"Telefono_cliente": step4.phone,
			"Email_cliente": step4.email,
			"Negocio_sucursal_external_id": SUCURSALID,
			"Ciudad_origen": step1.localidad,
			"Calle_origen": step1.street,
			"Numero_origen": step1.streetNumber,
			"Apto_origen": "",
			"Esquina_origen": "",
			"Observacion_origen": step3.observacionOrigen,
			"Location_origen": `${step1.lat}, ${step1.lng}`,
			"Ciudad_destino": step2.localidad,
			"Calle_destino": step2.street,
			"Numero_destino": step2.streetNumber,
			"Apto_destino": "",
			"Esquina_destino": "",
			"Observacion_destino": step3.observacionDestino,
			"Location_destino": `${step2.lat}, ${step2.lng}`,
			"Fecha_entrega": step3.serviceDate,
			"Franja_horaria": step3.schedule,
			"Cantidad_bultos": 1,
			"Detalle": "",
			"Pedido_external_id": "",
			"Nro_Factura": "",
			"Servicio": "Flash",//step3.deliveryType==1?"Express":"Programado",
			"Tipo_Vehiculo_Nombre": state.vehiculos.find(x=>x.NegocioTipoVehiculoId ==step3.vehicleType).NegocioTipoVehiculoNombre,
			"Tipo_Producto": 1,
			"Preclasificacion": "",
			"Complejidad": "NORMAL",
			"Tipo_operacion": tipo,
			"Productos": [
				{
					"ProductoCodigo": "S",
					"ProductoNombre": "SOBRE",
					"ProductoCantidad": 1,
					"ProductoTipoId": 1,
					"ProductoObservacion": "CONTRA FIRMA"
				}
			]
		}

		let response = await apiAltaPago(dataAlta)
		console.log(response)
		if(parseInt(response.Error_code)==0){
			if(tipo!=1)
				window.event.$emit('showError', response.Error_desc)
			commit('setApproved');
			return true
		}
		else{
			window.event.$emit('showError', response.Error_desc)
			return false
		}
	}

},
getters: {
	// ...
	getStep: (state) => (id) => {
	return state.steps.find(x => x.id === id)
	}
},
modules: {
	
}
})
